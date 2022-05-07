import './Activities.scss';


import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { fetchActivitiesByCategories, fetchCategories } from "../api/activities";
import { Activity } from "../types/activity";
import { TypeOfFirstArg } from "../types/utils";

type OnSelectedCategories = (selectedCategories: { [k: string]: boolean }) => void;
type SelectedCategories = TypeOfFirstArg<OnSelectedCategories>;

const Categories: React.FC<{ categories: string[], onSelectedCategories: OnSelectedCategories }> = (props) => {
  const { categories, onSelectedCategories } = props;

  const [selectedCategories, setSelectedCategories] = useState<{ [k: string]: boolean }>({});
  
  const selectCategory = (cat: string) => {
    const newSelectedCategories = {
      ...selectedCategories,
      [cat]: !selectedCategories[cat]
    };

    setSelectedCategories(newSelectedCategories);
    onSelectedCategories(newSelectedCategories);
  }

  return (
    <ul className="categories">
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

const ActivitiesList: React.FC<{ activities: string[] | null }> = (props) => {
  const { activities } = props;
  
  return (
    <div className="activities-wrapper">
      <div className="activities-list">
        <h2 className='activities-list__title'>Activities</h2>

        {
          activities && activities.length
            ? <ul className='activities-list__body'>
              {
                activities.map(
                  a => <li className='activities-list__activity' key={a}>{a}</li>
                )
              }
            </ul>
            : 'No activities yet.'
        }
      </div>
    </div>
  )
}

function Activities () {
  const [categories, setCategories] = useState<string[] | null>(null);
  const [activities, setActivities] = useState<string[] | null>(null);
  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<SelectedCategories>({});

  const selectedCategories = useMemo(() => categories?.filter(c => selectedCategoriesMap[c]), [selectedCategoriesMap]);

  useEffect(() => {
    fetchCategories().then(c => setCategories(c));
  }, []);

  useEffect(() => {
    if (!selectedCategories) {
      return;
    }
    
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
            onSelectedCategories={onSelectedCategories}
          />
          : 'Loading categories...'
      }

      { categories ? <ActivitiesList activities={activities} /> : null }
    </div>
  )
}

export default Activities