import {IIngredient} from "./ingredient.interface";
import {IDirection} from "./direction.interface";
export interface IRecipe{
    uuid: string,
    title: string,
    description: string,
    images: {
        full: string,
        medium: string,
        small: string
    },
    servings: number,
    prepTime: number,
    cookTime: number,
    postDate: Date,
    editDate: Date,
    ingredients: IIngredient[],
    directions: IDirection[]
}