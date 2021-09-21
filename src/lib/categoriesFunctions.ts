import { CategoryInterface } from '../types/inventoryAppBaseTypes';

export type OrderByType = "desc" | "asc";

export const filterCategoriesByName = (categories: CategoryInterface[], categoryName: string): CategoryInterface[] => {

    if (categoryName) {
        return categories.filter((category: CategoryInterface) => category.name.includes(categoryName.toLowerCase()));
    }

    return categories;

}