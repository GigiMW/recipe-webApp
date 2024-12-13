import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FriendSuggestionsComponent } from './friend-suggestions/friend-suggestions.component';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { FollowersPopupComponent } from './followers-popup/followers-popup.component';
import { FollowingComponent } from './following/following.component';

import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    SavedRecipeComponent,
    FriendSuggestionsComponent,
    MealPlanComponent,
    ShoppinglistComponent,
    FollowersPopupComponent,
    FollowingComponent,
    
    DetailsComponent,
         SearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
