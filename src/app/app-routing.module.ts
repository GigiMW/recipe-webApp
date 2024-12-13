import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { FriendSuggestionsComponent } from './friend-suggestions/friend-suggestions.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'profile/:uid', component: ProfileComponent },
 { path: 'details/:id', component: DetailsComponent },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'save',
      component: SavedRecipeComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },

    {
      path: 'suggest',
      component:FriendSuggestionsComponent,
    },
    {
      path: 'mealplan',
      component:MealPlanComponent,
    },
    { path: 'shopping-list', component: ShoppinglistComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
