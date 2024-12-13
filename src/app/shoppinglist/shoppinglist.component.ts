import { Component, OnInit } from '@angular/core';
import { MealPlanService } from '../mealPlan.service';
import { MealPlan } from '../meal_plan.interface';
import { AuthenticationService } from '../authentication.service';
import { Ingredient } from '../ingredient.interface';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  ingredientsByCategory: { [category: string]: Ingredient[] } = {};
  categories: string[] = [];

  constructor(private mealPlanService: MealPlanService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user && user.uid) {
        this.fetchMealPlans(user.uid);
      }
    });
  }

  fetchMealPlans(uid: string): void {
    this.mealPlanService.getMealPlans(uid).subscribe((mealPlans: MealPlan[]) => {
      this.extractIngredientsByCategory(mealPlans);
      this.extractCategories();
    });
  }

  extractIngredientsByCategory(mealPlans: MealPlan[]): void {
    mealPlans.forEach((mealPlan: MealPlan) => {
      mealPlan.ingredients.forEach((ingredientName: string) => {
        const category = this.getIngredientCategory(ingredientName);
        if (!this.ingredientsByCategory[category]) {
          this.ingredientsByCategory[category] = [];
        }
        const lowerCaseIngredientName = ingredientName.toLowerCase();
        if (!this.ingredientsByCategory[category].some(ingredient => ingredient.name.toLowerCase() === lowerCaseIngredientName)) {
          this.ingredientsByCategory[category].push({ name: ingredientName, category: category });
        }
      });
    });
  }

  extractCategories(): void {
    this.categories = Object.keys(this.ingredientsByCategory);
  }

  getIngredientCategory(ingredientName: string): string {
    const categoryMap: { [key: string]: string } = {
      'tomato': 'Vegetables',
      'apple': 'Fruits',
      'chicken': 'Proteins',
      'egg': 'Dairy',
      'eggs': 'Dairy',
      'milk': 'Dairy',
      'cheese': 'Dairy',
      'butter': 'Dairy',
      'beef': 'Meat',
      'fish': 'Seafood',
      'rice': 'Grains',
      'pasta': 'Grains',
      'bread': 'Grains',
      'potato': 'Vegetables',
      'banana':'Fruits',
      'sugars': 'beverages',
      'sugar': 'beverages',
    };
    const lowerCaseIngredientName = ingredientName.toLowerCase();
    return categoryMap[lowerCaseIngredientName] || 'Other';
  }

  // Method to remove an ingredient from the shopping list
  removeIngredient(category: string, ingredientName: string): void {
    const lowerCaseIngredientName = ingredientName.toLowerCase();
    this.ingredientsByCategory[category] = this.ingredientsByCategory[category].filter(ingredient => ingredient.name.toLowerCase() !== lowerCaseIngredientName);
  }
}
