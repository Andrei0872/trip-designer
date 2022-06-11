import './Activities.scss';


import { DragEvent, SyntheticEvent, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { fetchActivitiesByCategories, fetchCategories } from "../api/activities";
import { Activity } from "../types/activity";
import { TypeOfFirstArg } from "../types/utils";
import { useCategories } from '../hooks/useCategories';
import { useActivities } from '../context/activities';

type OnSelectedCategories = (selectedCategories: { [k: string]: boolean }) => void;
type SelectedCategories = TypeOfFirstArg<OnSelectedCategories>;

const ALL_CATEGORIES_LABEL = 'all';

const markSelectedCategories = (categories: string[]) => categories.reduce((selectedCategories: { [k: string]: boolean }, crtCat) => (selectedCategories[crtCat] = true, selectedCategories), {});

const Categories: React.FC<{ categories: string[], onSelectedCategories: OnSelectedCategories, categoriesSelectedByDefault?: { [k: string]: boolean } }> = (props) => {
  const { categories, onSelectedCategories, categoriesSelectedByDefault = {} } = props;

  const [selectedCategories, setSelectedCategories] = useState<{ [k: string]: boolean }>(categoriesSelectedByDefault);

  const areAllSelected = categories.filter(c => selectedCategories[c]).length === categories.length;
  
  const selectCategory = (cat: string) => {
    const isAllToggled = cat === ALL_CATEGORIES_LABEL && areAllSelected;
    if (isAllToggled) {
      return;
    }
    
    let newSelectedCategories;
    if (cat === ALL_CATEGORIES_LABEL) {
      newSelectedCategories = markSelectedCategories(categories);
    } else {
      newSelectedCategories = {
        ...selectedCategories,
        [cat]: !selectedCategories[cat]
      };
    }

    const isAnySelected = Object.values(newSelectedCategories).find(Boolean);
    if (!isAnySelected) {
      return;
    }

    setSelectedCategories(newSelectedCategories);
    onSelectedCategories(newSelectedCategories);
  }

  return (
    <ul className="categories">
      <li
        onClick={() => selectCategory(ALL_CATEGORIES_LABEL)}
        className={`categories__category ${areAllSelected ? 'categories__category--selected' : ''}`}
        key='all'
      >
        all
      </li>
      {categories.map(c => (
        <li
          className={`categories__category ${selectedCategories[c] ? 'categories__category--selected' : ''}`}
          onClick={() => selectCategory(c)}
          key={c}
        >
          {c}
        </li>
      ))}
    </ul>
  )
};

const ActivitiesList: React.FC<{ activities: Activity[] | null }> = (props) => {
  const { activities } = props;
  
  // FIXME(BE): use `number` instead of `string`.
  const onDragStart = (ev: DragEvent<any>, activityId: string) => {
    ev.dataTransfer?.setData("text", activityId);
  }

  return (
    <div className="activities-wrapper">
      <div className="activities-list">
        <h2 className='activities-list__title'>Activities</h2>

        {
          activities && activities.length
            ? <ul className='activities-list__body'>
              {
                activities.map(
                  a => 
                    <li
                      onDragStart={ev => onDragStart(ev, a.id.toString())}
                      draggable='true'
                      className='activities-list__activity'
                      key={a.id}
                    >
                      {a.name}
                    </li>
                )
              }
            </ul>
            : 'No activities yet.'
        }
      </div>
    </div>
  )
}

const DEFAULT_SELECTED_CATEGORIES = [ALL_CATEGORIES_LABEL];

// TODO: maybe useMemo
interface ActivitiesProps {
  alreadySelectedCategories?: string[];
}
function Activities (props: ActivitiesProps) {
  const { alreadySelectedCategories = DEFAULT_SELECTED_CATEGORIES } = props;

  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<SelectedCategories>({});
  const { activities, setActivities } = useActivities();

  const categories = useCategories();

  const selectedCategories = useMemo(() => categories?.filter(c => selectedCategoriesMap[c]), [selectedCategoriesMap]);

  let categoriesSelectedByDefault;
  const areAllSelectedByDefault = alreadySelectedCategories![0] === ALL_CATEGORIES_LABEL;
  if (areAllSelectedByDefault && categories) {
    categoriesSelectedByDefault = markSelectedCategories(categories);
  } else if (Array.isArray(alreadySelectedCategories)) {
    categoriesSelectedByDefault = markSelectedCategories(alreadySelectedCategories);
  }

  useEffect(() => {
    fetchActivitiesByCategories(selectedCategories).then(a => setActivities(a));
  }, [selectedCategories]);

  const onSelectedCategories = (selectedCategories: SelectedCategories) => {
    setSelectedCategoriesMap(selectedCategories)
  }

  return (
    <div className="activities">
      {
        categories
          ? 
          <Categories 
            categories={categories}
            categoriesSelectedByDefault={categoriesSelectedByDefault}
            onSelectedCategories={onSelectedCategories}
          />
          : 'Loading categories...'
      }

      { categories ? <ActivitiesList activities={activities} /> : null }
    </div>
  )
}

export default Activities