import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.interface';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ProfileUser } from '../user.interface';
import { Review } from '../review.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  newRating: number = 0;
  currentUser: ProfileUser | null = null;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['id'];
    this.recipeService.getRecipeById(recipeId).subscribe(recipe => {
      this.recipe = recipe;
    });
    this.userService.currentUserProfile$.subscribe(user => {
      this.currentUser = user;
    });
  }

  submitRatingAndReview(): void {
    if (this.currentUser && this.currentUser.uid && this.newRating > 0 && this.recipe) {
      // Check if the current user has already submitted a rating for this recipe
      if (this.userHasRatedRecipe(this.currentUser.uid, this.recipe.recipe_id)) {
        console.log('You have already rated this recipe.');
        return; // Exit the method if the user has already rated the recipe
      }
  
      const review: Review = {
        userId: this.currentUser.uid,
        username: this.currentUser.displayName || '',
        rating: this.newRating,
        createdAt: new Date()
      };
  
      this.recipeService.submitRatingAndReview(this.recipe.recipe_id, review)
        .then(() => {
          this.recipeService.getRecipeById(this.recipe?.recipe_id || '').subscribe(recipe => {
            this.recipe = recipe;
          });
        })
        .catch(error => {
          console.error('Error submitting rating and review:', error);
        });
    }
  }
  
  
  userHasRatedRecipe(userId: string, recipeId: string): boolean {
    // Check if the user has already rated the recipe
    if (this.recipe && this.recipe.reviews) {
      return this.recipe.reviews.some(review => review.userId === userId);
    }
    return false;
  }

  
  
}
