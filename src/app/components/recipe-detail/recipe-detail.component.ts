import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
import {ActivatedRoute} from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.interface';
import {apiURL} from '../../constants/constants';
import { ISpecial } from 'src/app/models/special.interface';
import { SubscriptionLike } from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private selectedRecipe: IRecipe;
  private selectedID: string;
  private imgUrl: string;
  private subscription: SubscriptionLike;

  constructor(private recipes: RecipesService, private route: ActivatedRoute) {
      this.route.params.subscribe( params => {
        this.selectedID = params.uuid
      })
   }
  
  initData(recipe){
    this.selectedRecipe = this.recipes.mergeSpecials(recipe);
    this.imgUrl = `${apiURL + this.selectedRecipe.images.full}`;
  }
  ngOnInit() {
    this.subscription = this.recipes.getSpecials().subscribe(data => {
      // this.specials = data;
      let recipe = this.recipes.getCachedRecipe(this.selectedID);
      if(!recipe){
        this.recipes.getRecipeById(this.selectedID).subscribe(data =>{
          this.initData(data);
        })
      } else {
        this.initData(recipe);
      }

    });

  }
  
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
