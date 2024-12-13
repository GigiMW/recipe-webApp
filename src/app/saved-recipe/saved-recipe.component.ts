import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ProfileUser } from '../user.interface';
import { Recipe } from '../recipe.interface';
import { environment } from '../../environments/environment';
import { RecipeService } from '../recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent implements OnInit {

  currentUser: ProfileUser | null = null; 
  savedRecipes: Recipe[] = [];

  constructor(private recservice:RecipeService,public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getSavedRecipesForUser(user.uid);
      } else {
        console.error('User not authenticated.');
      }
    });
  }
//get saved recipes which check  saved recipe ids still found in recipes if there get it if not the id not found
  async getSavedRecipesForUser(userId: string) {
    try {
      const userDoc = await firebase.firestore().collection('Users').doc(userId).get();
      const userData = userDoc.data() as ProfileUser; //data() extract data in type profile user 
      const savedRecipeIds = userData.savedRecipes || [];//get saved recipes from user data 
      const savedRecipes: Recipe[] = [];
      await Promise.all(savedRecipeIds.map(async (recipeId: string) => {
        const recipeDoc = await firebase.firestore().collection('recipes').doc(recipeId).get();
        if (recipeDoc.exists) {//check the recipe still found or not in all recipes 
          const recipeData = recipeDoc.data() as Recipe;
          savedRecipes.push(recipeData);
        } else {
          console.warn(`Recipe with ID ${recipeId} does not exist.`);
        }
      }));
      this.savedRecipes = savedRecipes;
      console.log('Saved Recipes:', this.savedRecipes);
    } catch (error) {
      console.error('Error getting saved recipes:', error);
    }
  }

  showRecipeDetails(recipeId: string) {
    this.router.navigate(['/details', recipeId]);
  }
}
