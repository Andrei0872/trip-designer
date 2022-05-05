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

    </div>
  )
}

export default Activitiesimport './Activities.scss';


import { useState } from "react";
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

