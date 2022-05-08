import { createContext, useContext, useEffect, useState } from "react";
import { fetchCategories } from "../api/activities";

const CategoriesContext = createContext<string[] | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: any }> = ({ children }) => {
  const [categories, setCategories] = useState<string[] | null | undefined>(null);

  useEffect(() => {
    fetchCategories().then(c => setCategories(c));
  }, []);

  return <CategoriesContext.Provider value={categories!}>
    {children}
  </CategoriesContext.Provider>
}

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error(`'useCategories' must be used within a ''CategoriesProvider!`);
  }

  return context;
};