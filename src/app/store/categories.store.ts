// categories.store.ts
import { createStore, withProps } from '@ngneat/elf';
import { Category } from '../interfaces/category.interface';

export interface CategoriesState {
  categories: Category[];
}

export const categoriesStore = createStore(
  { name: 'categories' },
  withProps<CategoriesState>({ categories: [] })
);
