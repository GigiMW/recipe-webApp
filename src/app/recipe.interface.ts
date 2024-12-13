import { Comment } from "./comment.interface";
import { Review } from "./review.interface";
export interface Recipe {
    recipe_id: string;
    recipe_image: string;
    recipe_name: string;
    recipe_ingredients: string[];
    recipe_steps: string[];
    recipe_cuisine: string;
    recipe_cookingTime: string;
    saved: boolean;
    likes: number;
    userLikes: string[];
    uid: string;
    postedBy?: string;
    comments: Comment[];
    averageRating?: number;
    reviews?: Review[];
}
