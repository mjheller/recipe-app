import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { IRecipe } from "../../models/recipe.interface";
import { Router } from '@angular/router';
@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  private recipesList;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesList = this.recipesService.getRecipes();
  }

}
