import { Action, createReducer, on } from '@ngrx/store';
import * as RecipeActions from './recipes.actions'
import { Recipe } from 'src/app/models/recipe.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IIngredient } from 'src/app/models/ingredient.interface';

export interface RecipeState extends EntityState<Recipe> {
    selectedRecipeId: string | null;
    loading: false,
    isError: false,
    // ingredients: EntityState<IIngredient[]>
}
export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({
  selectId: (recipe: Recipe) => recipe.uuid,
 
});

export const initialState: RecipeState = adapter.getInitialState({selectedRecipeId: null, loading: false, isError: false})

const recipesReducer = createReducer(
    initialState,
    //Create Recipes

    on(RecipeActions.createRecipeSuccess, (state, { recipe }) => {
        return adapter.addOne(recipe, state)
      }),
      on(RecipeActions.updateRecipe, (state, { update }) => {
        console.log("UPDATE", update.changes)
        return adapter.updateOne(update, state);
      }),
      //Map Recipes
      on(RecipeActions.mapRecipe, (state, { entityMap }) => {
        return adapter.mapOne(entityMap, state);
      }),
      on(RecipeActions.mapRecipes, (state, { entityMap }) => {
        return adapter.map(entityMap, state);
      }),
      //Delete Recipes
      on(RecipeActions.deleteRecipe, (state, { id }) => {
        return adapter.removeOne(id, state);
      }),
      on(RecipeActions.deleteRecipesByPredicate, (state, { predicate }) => {
        return adapter.removeMany(predicate, state);
      }),
      //Load Recipes
      on(RecipeActions.loadRecipes, (state) => {
        return {...state, isLoading: true}
      }),
      on(RecipeActions.loadRecipesSuccess, (state, {  recipes}) => {
        return adapter.setAll(recipes, {...state, isLoading: false});
      }),
      on(RecipeActions.loadRecipesFail, (state) => {
        return {...state, isLoading: false, error: true}
      }),
      on(RecipeActions.clearRecipes, state => {
        return adapter.removeAll({ ...state, selectedRecipeId: null });
      }),
      on(RecipeActions.selectRecipeSuccess, state => {
        return {...state, error: false, loading: false}
      })
    )

export function reducer(state: RecipeState | undefined, action: Action){
    return recipesReducer(state, action)
}

export const getSelectedRecipeId = (state: RecipeState) => state.selectedRecipeId;
 
// get the selectors
export const {
   selectIds,
   selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
 
// select the array of user ids
// export const selectRecipeIds = selectIds;
 
// // select the dictionary of user entities
// export const selectRecipeEntities = selectEntities;
 
// select the array of users
// export const selectAllRecipes = selectAll;
 





















/*
const recipesReducer = createReducer(
    initialState,
     on(RecipesActions.removeRecipe, (state, {recipeID}) => state.filter((recipe: Recipe) => recipe.uuid !== recipeID)),
     on(RecipesActions.addRecipe, (state, { recipe }) => {
        if (state.filter((recipe: Recipe) => recipe.uuid).length > 0) return state;
     
        return [...state, recipe];
      })
)
*/