import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from "../constants/constants";
import { Recipe } from "../models/recipe.interface";

import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
  constructor( private store: Store ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    //  return this.service.getRecipeById(route.paramMap.get('uuid'));
  }
}