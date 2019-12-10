import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from "../constants/constants";
import { IRecipe } from "../models/recipe.interface";
import { ISpecial } from '../models/special.interface';
import { Observable } from 'rxjs';
import { tap, combineLatest } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public recipeMap: Map<string, IRecipe>
  public specialsArray: Array<ISpecial>;
  constructor(private http: HttpClient) {
    this.recipeMap = new Map<string, IRecipe>();
    this.specialsArray = new Array<ISpecial>();
   }
  
  addToRecipeMap = (recipes: IRecipe[])=> {
    recipes.map(r => this.recipeMap.set(r.uuid, r))
  }

  getCachedRecipe(id){
    return this.recipeMap.get(id);
  }

  getRecipeById(id){
    return this.http.get<IRecipe>(`${apiURL}/recipes/${id}`)
  }


  getRecipes(){
    return this.http.get<IRecipe[]>(`${apiURL}/recipes`).pipe(
      tap(this.addToRecipeMap),
    );
  }

  getSpecials(){
    return this.http.get<ISpecial>(`${apiURL}/specials`).pipe(
      tap(this.addToSpecialsArray),
    );
  }

  addToSpecialsArray = (data =>{
    this.specialsArray = data;
  })

  mergeSpecials(recipe: IRecipe){
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
