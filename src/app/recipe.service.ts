import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDocs,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Recipe } from './recipe.interface';
import { Comment } from './comment.interface';
import { map } from 'rxjs/operators';
import { get } from 'jquery';
import { Review } from './review.interface';
@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    constructor(
        private db: AngularFireDatabase,
        private storage: AngularFireStorage,
      private firestore: AngularFirestore,
      private fire: Firestore

    ) { }
    //addRecipe() in home.ts
    addRecipe(recipeData: any): Promise<void> {
        return firebase.firestore().collection('recipes').doc(recipeData.recipe_id).set(recipeData);
    }
    //getRecipes() in home.ts
    getRecipes(): Observable<Recipe[]> {
        return this.firestore.collection<Recipe>('recipes').valueChanges();
    }
    //likeRecipe() in home.ts
    updateRecipeLikes(recipeId: string, likes: number, userLikes: string[]): Promise<void> {
        const recipeRef = this.firestore.collection('recipes').doc(recipeId);
        return recipeRef.update({ likes: likes, userLikes: userLikes });
    }
    //ngOnInit() in details.ts
    getRecipeById(recipeId: string): Observable<Recipe | undefined> {
        return this.firestore.collection<Recipe>('recipes').doc(recipeId).valueChanges();
    }
 
    getRecipesByUser(uid: string): Observable<Recipe[]> {
        return this.firestore.collection<Recipe>('recipes', ref => ref.where('uid', '==', uid)).valueChanges();
    }

    getAllProducts() {
      return this.firestore.collection('/recipes').snapshotChanges();
    }
    //get recipe document based on its recipe id and add comment field to set comment
    // addComment() in home.ts
    addComment(recipeId: string, comment: Comment): Promise<void> {
        return firebase.firestore().collection('recipes').doc(recipeId).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
    }
    //searchRecipes() in home.ts
    searchRecipes(criteria: string, query: string): Observable<Recipe[]> {
        if (criteria === 'recipe_ingredients') {
            return this.firestore.collection<Recipe>('recipes', ref =>
                ref.where(criteria, 'array-contains', query)).valueChanges();
        } else {
            return this.firestore.collection<Recipe>('recipes', ref =>
                ref.where(criteria, '>=', query).where(criteria, '<=', query + '\uf8ff')).valueChanges();
        }
    }
    
    deleteRecipe(recipeId: string): Observable<void> {
        return from(this.firestore.collection('recipes').doc(recipeId).delete());
    }

    submitRatingAndReview(recipeId: string,review:Review): Promise<void> {
        return this.firestore.collection('recipes').doc(recipeId).update({
          reviews: firebase.firestore.FieldValue.arrayUnion(review)
        });
      }
}
