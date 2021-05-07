import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecipesService} from '../../services/recipes.service';
import {ActivatedRoute} from '@angular/router';
import { Recipe } from 'src/app/models/recipe.interface';
import {apiURL} from '../../constants/constants';
import { ISpecial } from 'src/app/models/special.interface';
import { Observable, SubscriptionLike } from "rxjs";
import { select, Store } from '@ngrx/store';
import { loadSpecials, selectRecipe } from 'src/app/store/recipes/recipes.actions';
import { selectCurrentRecipe} from 'src/app/store/recipes';
import { debounceTime, filter, map, take, throttle, throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;

  selectedID: string;
  imgUrl: string;
  subscription: SubscriptionLike;
  isHovering: boolean;
  selectedRecipe$ = this.store.select(selectCurrentRecipe)

  constructor(private recipes: RecipesService, private store: Store, private route: ActivatedRoute) {
      this.route.params.subscribe( params => {
        this.selectedID = params.uuid
      })
   }
  
  initData(){

  }
  ngOnInit() {

    this.initData()
  }
  
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
