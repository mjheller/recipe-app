import { selectRouteParams } from '../router.selectors';
import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.interface';
  import * as recipesReducer from './recipes.reducer';
   
  export interface State {
    recipes: recipesReducer.RecipeState;
  }
   
  export const recipeReducer: ActionReducerMap<State> = {
    recipes: recipesReducer.reducer,
  };
   
  export const selectRecipeState = createFeatureSelector<recipesReducer.RecipeState>('recipes');
   
  export const selectRecipeIds = createSelector(
    selectRecipeState,
    recipesReducer.selectIds // shorthand for RecipesState => fromRecipe.selectRecipeIds(RecipesState)
  );
  export const selectRecipeEntities = createSelector(
    selectRecipeState,
    recipesReducer.selectEntities
  );
  // export const selectAllRecipes = createSelector(
  //   selectRecipeState,
  //   recipesReducer.selectAll
  // );
  export const getRecipes = (state: State) => state.recipes;
  export const selectAllRecipes = createSelector(getRecipes, recipesReducer.selectAll )
  

export const getSelectedRecipeId = (state: recipesReducer.RecipeState) => state.selectedRecipeId;

// export const selectCurrentRecipe = createSelector(
//   selectRecipeEntities,
//   getSelectedRecipeId,
//   (recipeEntities, recipeId) => recipeEntities[recipeId]
// );

  export const selectCurrentRecipeId = createSelector(
    selectRecipeState,
    recipesReducer.getSelectedRecipeId
  );
   

  export const selectCurrentRecipe = createSelector(
      selectRecipeEntities,
      selectRouteParams,
      (recipes, { uuid }) => recipes[uuid]
    );

//   export const selectCurrentRecipe = createSelector(
//     selectRecipeEntities,
//     selectCurrentRecipeId,
//     (RecipeEntities, recipeID) => RecipeEntities[recipeID]
//   );