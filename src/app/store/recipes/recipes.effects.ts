import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {Update} from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { EMPTY, forkJoin, noop, Observable, ObservableInput, of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, flatMap, concatMap, mergeAll, concatAll, toArray, merge, withLatestFrom, combineAll, take, filter } from 'rxjs/operators';
import { IIngredient } from 'src/app/models/ingredient.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { ISpecial } from 'src/app/models/special.interface';
import { selectAllRecipes } from '.';
import { RecipesService } from '../../services/recipes.service';
import * as recipeActions from './recipes.actions'



@Injectable()
export class RecipeEffects {


  loadRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipeActions.loadRecipes),
      switchMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectAllRecipes)
          ),
          map(([action, recipes]) => {
            return recipes;
          })
        )
      ),
      switchMap((value) => {

         return this.recipesService.getRecipes(value)
            .pipe(
                map(recipes => ({ type: recipeActions.type.LOAD_ALL_RECIPES_SUCCESS, recipes })),
                catchError(() => of({type: recipeActions.type.LOAD_ALL_RECIPES_FAIL}))
                
            )
      })
    );
  });

  createRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipeActions.createRecipe),
      switchMap((action) =>
        this.recipesService.addNewRecipeToDB(action.recipe).pipe(
          map((recipe) => recipeActions.createRecipeSuccess({ recipe })),
          catchError(() => of({type: recipeActions.type.CREATE_RECIPE_FAIL}))
        )
      )
    )
  );


  loadSpecials$  = createEffect(() =>
    this.actions$.pipe(
      
      ofType(recipeActions.loadSpecials),
      map((recipe:any) => recipe),
      
      switchMap( (r:Recipe) => this.recipesService.getSpecials2(r).pipe(
        
        map( (recipe: Recipe):Update<Recipe> =>  ({id: recipe.uuid, changes: {ingredients: [...recipe.ingredients]} as Partial<Recipe> })as Update<Recipe> ),
        map( (update: Update<Recipe>) => this.store.dispatch(recipeActions.updateRecipe({update}))),
        // catchError(err => recipeActions.updateRecipeFail(err)),
      )),
     
       map(() => recipeActions.loadSpecialsSuccess()),

       
    ), 
  )

  

  
  // loadRecipeDetails$  = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(recipeActions.loadRecipeDetail),
  //     switchMap( (id:string) => this.recipesService.getRecipeById(id).pipe(
  //       map(recipe => recipeActions.loadRecipeDetailSuccess(recipe)),//({ type: recipeActions.type.LOAD_RECIPE_DETAILS_SUCCESS, recipe })),
  //       catchError(() => of({type: recipeActions.type.LOAD_RECIPE_DETAILS_FAIL}))
  //     )),
  //     // map(recipe => recipe)
     
  //   )
  // )

  constructor(
    private actions$: Actions,
    private recipesService: RecipesService,
    private store: Store
  ) {}
}