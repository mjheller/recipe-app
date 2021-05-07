import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';
 
import {Recipe} from '../../models/recipe.interface'
export enum type {
    SELECT_RECIPE            = '[ Recipe ] Select Recipe',
    SELECT_RECIPE_SUCCESS    = '[ Recipe ] Select Recipe Success',
    LOAD_ALL_RECIPES         = '[Recipe/API] Load Recipes',
    LOAD_ALL_RECIPES_FAIL    = '[Recipe/API] Load Recipes Fail',
    LOAD_ALL_RECIPES_SUCCESS = '[Recipe/API] Load Recipes Success',
    FIND_ONE_RECIPE          = '[ Recipe ] Find One Recipe',
    FIND_ONE_RECIPE_FAIL     = '[ Recipe ] Find One Recipe Fail',
    FIND_ONE_RECIPE_SUCCESS  = '[ Recipe ] Find One Recipe Success',
    CREATE_RECIPE            = '[Recipe/API] Create Recipe',
    CREATE_RECIPE_FAIL       = '[Recipe/API] Create Recipe Fail',
    CREATE_RECIPE_SUCCESS    = '[Recipe/API] Create Recipe Success',
    UPDATE_RECIPE            = '[Recipe/API] Update Recipe',
    UPDATE_RECIPE_FAIL       = '[Recipe/API] Update Recipe Fail',
    UPDATE_RECIPE_SUCCESS    = '[Recipe/API] Update Recipe Success',
    DELETE_RECIPE            = '[Recipe/API] Delete Recipe',
    DELETE_RECIPE_FAIL       = '[Recipe/API] Delete Recipe Fail',
    DELETE_RECIPE_SUCCESS    = '[Recipe/API] Delete Recipe Success',
    CLEAR_FORM = '[Recipes Page] Clear Form',
    LOAD_SPECIALS = '[Recipe/API] Merge Special Ingredients',
    LOAD_SPECIALS_SUCCESS = '[Recipe/API] Merge Special Ingredients Success',
    LOAD_RECIPE_DETAILS = '[Recipe/API] Load Recipe Details',
    LOAD_RECIPE_DETAILS_SUCCESS = '[Recipe/API] Load Recipe Details Success',
    LOAD_RECIPE_DETAILS_FAIL = '[Recipe/API] Load Recipe Details Fail',
  }
  
export const loadRecipes = createAction(type.LOAD_ALL_RECIPES);

export const selectRecipe = createAction(type.SELECT_RECIPE, props<{ recipe: Recipe }>());
export const loadSpecials = createAction(type.LOAD_SPECIALS, props<{ recipe: Recipe }>())
export const loadSpecialsSuccess = createAction(type.LOAD_SPECIALS_SUCCESS)

export const loadRecipeDetail = createAction(type.LOAD_RECIPE_DETAILS, props<{ id: string }>());
export const loadRecipeDetailSuccess = createAction(type.LOAD_RECIPE_DETAILS_SUCCESS, props<{ id: string }>());
export const loadRecipeDetailFail = createAction(type.LOAD_RECIPE_DETAILS_FAIL, props<{ error: Error }>());

export const selectRecipeSuccess = createAction(type.SELECT_RECIPE_SUCCESS)//, props<{ recipe: Recipe }>());
export const loadRecipesSuccess = createAction(type.LOAD_ALL_RECIPES_SUCCESS, props<{ recipes: Recipe[] }>());
export const loadRecipesFail = createAction(type.LOAD_ALL_RECIPES_FAIL, props<{ error: Error }>());
export const createRecipe = createAction(type.CREATE_RECIPE, props<{ recipe: Recipe }>());
export const createRecipeSuccess = createAction(type.CREATE_RECIPE_SUCCESS, props<{ recipe: Recipe }>());
export const createRecipeFail = createAction(type.CREATE_RECIPE_FAIL);
export const updateRecipe = createAction(type.UPDATE_RECIPE, props<{ update: Update<Recipe> }>());
export const updateRecipeFail = createAction(type.UPDATE_RECIPE_FAIL,  props<{ error: Error }>());
export const mapRecipe = createAction('[Recipe/API] Map Recipe', props<{ entityMap: EntityMapOne<Recipe> }>());
export const mapRecipes = createAction('[Recipe/API] Map Recipes', props<{ entityMap: EntityMap<Recipe> }>());
export const deleteRecipe = createAction(type.DELETE_RECIPE, props<{ id: string }>());
export const deleteRecipesByPredicate = createAction('[Recipe/API] Delete Recipes By Predicate', props<{ predicate: Predicate<Recipe> }>());
export const clearRecipes = createAction('[Recipe/API] Clear Recipes');
export const clearRecipesForm = createAction(type.CLEAR_FORM);


