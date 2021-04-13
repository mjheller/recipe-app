import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.interface';
import {apiURL} from '../../constants/constants';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: IRecipe;
  imgUrl: string;
  
  constructor(private router: Router) { }

  ngOnInit() {
    if(this.recipe.images){
      this.imgUrl = `${apiURL + this.recipe.images.small}`;
    }
    
  }
  openRecipeDetails(event, r){
    //console.log(event, r)
    this.router.navigate(['/recipe-detail', r.uuid])
  }
}
