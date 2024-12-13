import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MealPlan } from './meal_plan.interface';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {

  constructor(private firestore: AngularFirestore) { }

  getMealPlans(uid: string): Observable<MealPlan[]> {
    return this.firestore.collection<MealPlan>('mealPlans', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  createMealPlan(mealPlan: MealPlan): Promise<void> {
    return this.firestore.collection('mealPlans').doc(mealPlan.id).set(mealPlan);
  }

  deleteMealPlan(mealPlanId: string): Promise<void> {
    return this.firestore.collection('mealPlans').doc(mealPlanId).delete();
  }
}
