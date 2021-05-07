import { ActionReducerMap } from '@ngrx/store'
import {recipeReducer} from './recipes'
import { RecipeEffects } from './recipes/recipes.effects'

export interface AppState {

}


export const rootReducer: ActionReducerMap<AppState> = {
    recipes: recipeReducer
}

export const effects = [
    RecipeEffects
]
// export * from './recipes';
