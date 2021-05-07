import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { Recipe } from "../../models/recipe.interface";
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAll } from 'src/app/store/recipes/recipes.reducer';
 import { selectAllRecipes } from 'src/app/store/recipes';
import { loadRecipes } from 'src/app/store/recipes/recipes.actions';
@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipesList: any//Recipe;
  recipes$: Observable<Recipe[]>
  constructor(private store: Store,private recipesService: RecipesService, private router: Router) { }

  ngOnInit() {

      this.recipes$= this.store.select(selectAllRecipes)
      this.store.dispatch(loadRecipes())

  }

  selectRecipe(event, recipe: Recipe){

  }

}
