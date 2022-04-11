import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { SideDishesPage } from './pages/SideDishesPage';
import { RecipeUpdatePage } from './pages/RecipeUpdatePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/side-dishes" element={<SideDishesPage />} />
      <Route path="/recipe/:slug/update" element={<RecipeUpdatePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
