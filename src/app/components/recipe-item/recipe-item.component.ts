import { Component, OnInit, Input, Output } from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as EventEmitter from 'events';
import { Recipe } from 'src/app/models/recipe.interface';
import { selectRecipe } from 'src/app/store/recipes/recipes.actions';
import {apiURL} from '../../constants/constants';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: Recipe;

  imgUrl: string;
  
  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
    if(this.recipe.images){
      this.imgUrl = `${apiURL + this.recipe.images.small}`;
    }
    
  }
  openRecipeDetails(event, r){
    this.router.navigate(['/recipe-detail', r.uuid])
  }
}
