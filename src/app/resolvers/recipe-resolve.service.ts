import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiURL } from "../constants/constants";
import { IRecipe } from "../models/recipe.interface";
import { ISpecial } from '../models/special.interface';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<IRecipe> {
  constructor(private service: RecipesService ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.getRecipeById(route.paramMap.get('uuid'));
  }
}