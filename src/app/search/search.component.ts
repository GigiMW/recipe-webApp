import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = ''; // Two-way bound to the search input
  selectedCriteria: string = 'recipe_name'; // Two-way bound to the dropdown
  recipes: Recipe[] = []; // Filtered recipes
  allRecipes: Recipe[] = []; // Full list of recipes

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Fetch all recipes when the component initializes
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.allRecipes = recipes;
      this.recipes = recipes; // Initialize with all recipes displayed
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      // Filter recipes based on search query and selected criteria
      this.recipes = this.allRecipes.filter((recipe) => {
        const field = recipe[this.selectedCriteria as keyof Recipe];
        return field?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      // Reset to display all recipes if the search query is empty
      this.recipes = this.allRecipes;
    }
  }
}
