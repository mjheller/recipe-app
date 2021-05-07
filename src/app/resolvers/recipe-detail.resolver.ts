
import { Recipe } from "../models/recipe.interface";
import { Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';


import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Params
} from '@angular/router';

import { selectCurrentRecipe } from "../store/recipes";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { loadRecipeDetail, loadRecipes, loadSpecials } from "../store/recipes/recipes.actions";

@Injectable({
  providedIn: 'root'
})


export class RecipeDetailResolver implements Resolve<boolean> {
  constructor(private store: Store){}

  
waitForDataToLoad(params: Params): Observable<Recipe> {
  return this.store.select(selectCurrentRecipe).pipe(
    // tap(recipe=> console.log("!",recipe)),
    switchMap((recipe) => {
      
      if(!recipe){
        // this.store.dispatch(loadRecipeDetail(params.uuid))
        this.store.dispatch(loadRecipes())
      }
      return of(recipe)
    }),
    filter(recipe => !!recipe), 
    take(1) )
}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {

    return this.waitForDataToLoad(route.params).pipe(
       switchMap((recipe)=> of(this.store.dispatch(loadSpecials({recipe})))),
      )

  }
}
