import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.interface';
import { MealPlan } from '../meal_plan.interface';
import { MealPlanService } from '../mealPlan.service';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  recipes: Recipe[];
  meals: MealPlan[] | null = null;
  selectedRecipeId: string | null = null;
  selectedDay: string = '';
  selectedType: string = '';
  userId: string | null = null;

  constructor(
    private recipeService: RecipeService,
    private mealPlanService: MealPlanService,
    private userService: UsersService,
    private authService:AuthenticationService,private router:Router
  ) { this.recipes = []; }

  ngOnInit(): void {
    this.loadRecipes();
    this.getUserProfile();
    this.loadMeals();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
showRecipeDetails(recipeId: string) {
    this.router.navigate(['/details', recipeId]);
  }
  onSelect(event: any): void {
    const recipeId: string = event.target.value;
    this.selectedRecipeId = recipeId;
  }

  addMealPlan(): void {
    if (this.selectedRecipeId && this.selectedDay && this.selectedType && this.userId) {
      const existingMealPlan = this.meals?.find(mealPlan =>
        mealPlan.recipe_id === this.selectedRecipeId &&
        mealPlan.day === this.selectedDay &&
        mealPlan.type === this.selectedType &&
        mealPlan.uid === this.userId
      );

      if (existingMealPlan) {
        console.log('Meal plan already exists.');
      } else {
        const selectedRecipe = this.recipes?.find(recipe => recipe.recipe_id === this.selectedRecipeId);

        if (selectedRecipe && Array.isArray(selectedRecipe.recipe_ingredients)) {
          const recipeName = selectedRecipe.recipe_name;
          const mealPlanId = this.generateMealPlanId();

          const mealPlan: MealPlan = {
            id: mealPlanId,
            recipe_id: this.selectedRecipeId!,
            day: this.selectedDay,
            type: this.selectedType,
            uid: this.userId!,
            name: recipeName,
            ingredients: selectedRecipe.recipe_ingredients, // Store ingredients here
          };

          this.mealPlanService.createMealPlan(mealPlan)
            .then(() => { })
            .catch((error) => {
              console.error('Error adding meal plan:', error);
            });
        } else {
          console.error('Selected recipe not found or recipe ingredients are not in the expected format.');
        }
      }
    } else {
      console.error('Some required fields are missing.');
    }
  }

  deleteMealPlan(mealPlanId: string): void {
    this.mealPlanService.deleteMealPlan(mealPlanId)
      .then(() => {
        // Reload meals after deletion
        this.loadMeals();
      })
      .catch((error) => {
        console.error('Error deleting meal plan:', error);
      });
  }

  generateMealPlanId(): string {
    return 'meal-plan-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  getUserProfile(): void {
    this.userService.currentUserProfile$.subscribe((userProfile) => {
      if (userProfile && userProfile.uid) {
        this.userId = userProfile.uid;
      }
    });
  }

  loadMeals(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.uid) {
        this.mealPlanService.getMealPlans(user.uid).subscribe((meals: MealPlan[]) => {
          this.meals = meals;
        });
      }
    });
  }


  getRecipeImage(recipeId: string): string | undefined {
    const selectedRecipe = this.recipes?.find(recipe => recipe.recipe_id === recipeId);
    return selectedRecipe?.recipe_image;
  }



}
