import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';
import {IDirection} from 'src/app/models/direction.interface';
import * as uuid from 'uuid';
import { Store } from '@ngrx/store';
import { createRecipe } from 'src/app/store/recipes/recipes.actions';
import { Recipe } from 'src/app/models/recipe.interface';
import { Subscription } from 'rxjs';
import * as recipeActions from "../../store/recipes/recipes.actions"

import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeForm: FormGroup;
  formSuccess : Subscription;
  servingsNumbers: number[];
  ingredientsArray: string[];
  directionsArray: IDirection[];

  @ViewChild('ingredient') ingredientRef: ElementRef;
  @ViewChild('direction') directionRef: ElementRef;
  constructor(private store: Store, 
    private actions$: Actions,
    private formBuilder: FormBuilder,
    private router: Router,
    private recipeService: RecipesService) {}

  
  ngOnInit() {
    this.ingredientsArray = new Array<string>();
    this.directionsArray = new Array<IDirection>();
    this.servingsNumbers = Array(10).fill(1).map((x,i)=>i+1);

    this.recipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      servings: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      ingredients: this.formBuilder.array([], Validators.required),
      directions: this.formBuilder.array([], Validators.required)
    })

    this.formSuccess = this.actions$.pipe(
      ofType(recipeActions.createRecipeSuccess)
    )
      .subscribe(() => {
        this.router.navigate(["/"])
        // this.recipeForm.reset();
        // this.success.emit();
      });
  }

  get ingredients(): FormArray{
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get directions(): FormArray{
    return this.recipeForm.get('directions') as FormArray;
  }

  addIngredient(ingredient){
    
    this.ingredientsArray.push(ingredient.value);
    this.ingredients.push(this.formBuilder.control(ingredient.value))
    this.ingredientRef.nativeElement.value = ""
  }

  removeIngredient(i){
    this.ingredientsArray.splice(i,1);
    this.ingredients.removeAt(i);
  }

  addDirection(direction){
    let newDirection: IDirection = {
      optional: true,
      instructions: direction.value
    }

    this.directionsArray.push(direction.value);
    this.directions.push(this.formBuilder.control(newDirection));
    this.directionRef.nativeElement.value = '';
  }

  removeDirection(i){
    this.directionsArray.splice(i,1);
    this.directions.removeAt(i);
  }

  finalizeRecipe(){
    console.log(this.recipeForm.value);
    // this.recipeService.addNewRecipeToDB(Object.assign({}, this.recipeForm.value, {uuid: uuid.v4()})).subscribe(data => {
    //   if(data){
    //     this.recipeForm.reset();
    //   }
    // })
    let recipe: Recipe = Object.assign({}, this.recipeForm.value, {uuid: uuid.v4()})
    this.store.dispatch(createRecipe({recipe}))
    
  }

}
