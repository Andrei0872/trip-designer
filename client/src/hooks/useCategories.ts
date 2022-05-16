import { useState, useEffect } from "react";
import { fetchCategories } from "../api/activities";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[] | null | undefined>(null);

  useEffect(() => {
    fetchCategories().then(c => setCategories(c));
  }, []);

  return categories;
};