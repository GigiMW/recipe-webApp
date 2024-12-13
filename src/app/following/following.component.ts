
import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

import { ProfileUser } from '../user.interface'

import {  switchMap } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


import { RecipeService } from '../recipe.service';

import { Recipe } from '../recipe.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../environments/environment';
import { Comment } from '../comment.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrl: './following.component.css'
})
export class FollowingComponent {
  users$: Observable<ProfileUser | null> | undefined;
  //followers$!: Observable<ProfileUser[]>;followers!: ProfileUser[];
  following$: Observable<any[]> | undefined; // Adjust the type according to your follower data structure
  isPopupVisible: boolean = true;
  storage: any;
  currentUser: ProfileUser | null = null;

  constructor(public usersService: UsersService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user?.uid) {
        this.following$ = this.usersService.getFollowingsByUser(user.uid);
      } else {

      }
    });
    firebase.initializeApp(environment.firebase);
    this.storage = firebase.storage();



    this.usersService.currentUserProfile$.subscribe(userProfile => {
      if (userProfile) {
        this.currentUser = userProfile;
      }

    });
  }
  async remove(following: any) {

    const userRef = firebase.firestore().collection('Users').doc(this.currentUser?.uid);
    const userDoc = await userRef.get();
    await userRef.update({
      following: firebase.firestore.FieldValue.arrayRemove(following)
      // Adjust this line to use recipe.recipe_id

    });
    //read followings after removing
   
  }

   loadFollowers(uid: string) {
    this.following$ = this.usersService.getFollowingsByUser(uid);
  }
  closePopup() {
    this.isPopupVisible = false;

  }

  
}


