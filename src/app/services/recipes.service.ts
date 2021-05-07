import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from "../constants/constants";
import { Recipe } from "../models/recipe.interface";
import { ISpecial } from '../models/special.interface';
import * as utils from '../utils'
import { EMPTY, forkJoin, of } from 'rxjs';
import { tap, flatMap, } from 'rxjs/operators';
import { IIngredient } from '../models/ingredient.interface';
import { Store } from '@ngrx/store';
import { loadRecipes } from '../store/recipes/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipeMap: Map<string, Recipe>
  public specialsArray: Array<ISpecial>;
  constructor(private http: HttpClient) {
    this.recipeMap = new Map<string, Recipe>();
    this.specialsArray = new Array<ISpecial>();
   }
  
  addToRecipeMap = (recipes: Recipe[])=> {
    recipes.map(r => this.recipeMap.set(r.uuid, r))
  }

  addNewRecipeToDB(recipe: Recipe){
    return this.http.post<Recipe>(`${apiURL}/recipes`, {...recipe});
  }

  getCachedRecipe(id){
    return this.recipeMap.get(id);
  }

  getRecipeById(id){
    return this.http.get<Recipe>(`${apiURL}/recipes/${id}`)
  }


  getRecipes(recipes: Recipe[]){
    if (recipes && recipes.length){
      return of(recipes)
    } else {
      return this.http.get<Recipe[]>(`${apiURL}/recipes`).pipe(
        tap(this.addToRecipeMap),
        // map( recipes => recipes.map(recipe => recipe.id = recipe.uuid)),
        // map(recipes => utils.arrayToObject(recipes))
      );
    }
    
  }

  getSpecials(){
    return this.http.get<ISpecial>(`${apiURL}/specials`).pipe(
      tap(this.addToSpecialsArray),
    );
  }

  getSpecials2(r: Recipe){
    if(r){
      var recipe = JSON.parse(JSON.stringify(r))
      if (recipe.recipe){
        recipe = recipe.recipe
      }
      const specials = recipe.ingredients.map(ing => {
        return this.getSpecialWithIngredientId(ing.uuid)
      })
      return forkJoin(specials).pipe(
        flatMap((specials) =>{
          const flattenedArray: ISpecial[] = [].concat(...specials)
          flattenedArray.forEach((special) => {
            let ingredientIndex = recipe.ingredients.findIndex(i => i.uuid == special.ingredientId)
            const {type, title, text, geo} = special
            recipe.ingredients[ingredientIndex] =  Object.assign({}, recipe.ingredients[ingredientIndex], {type, title, text, geo});
          })
          // return of(flattenedArray)
          return of(recipe)
        }),
        
  
      )
    } else {
      return of(EMPTY)
    }
   
  }

  getSpecialWithIngredientId(id: string){
    console.log(`${apiURL}/specials?ingredientId=${id}`)
    return this.http.get<ISpecial>(`${apiURL}/specials?ingredientId=${id}`).pipe()
  }
 
  addToSpecialsArray = (data =>{
    this.specialsArray = data;
  })

  mergeSpecials(recipe: Recipe){
  //  recipe.ingredients.filter(ing => {
  //    return this.specialsArray.filter(sp => {
  //      return sp.ingredientId === ing.uuid
  //    })
  //  })
    for(let i=0; i<recipe.ingredients.length; i++){
      for(let j=0; j< this.specialsArray.length; j++){
        if(recipe.ingredients[i].uuid === this.specialsArray[j].ingredientId){
          const {type, title, text, geo} = this.specialsArray[j];
          recipe.ingredients[i] = Object.assign({}, recipe.ingredients[i], {type, title, text});
        }
      }
    }
    
    return recipe;
    //let result =  recipe.ingredients.filter(i =>  this.specialsArray.filter(special => special.ingredientId === i.uuid))

  }
}
