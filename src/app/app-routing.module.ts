import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
// import { RecipeResolver } from './resolvers/recipe-resolve.service';

const routes: Routes = [
  {path: '', redirectTo: '/recipes-list' , pathMatch: 'full'},
  {path: 'recipes-list', component: RecipesListComponent},
  {path: 'recipes-list/recipe-create', component: RecipeCreateComponent },
  {path: 'recipe-detail/:uuid', component: RecipeDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
