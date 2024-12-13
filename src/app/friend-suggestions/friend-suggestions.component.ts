import { Component,OnInit } from '@angular/core';
import {  switchMap } from 'rxjs';
import { UsersService } from '../users.service';
import { ProfileUser } from '../user.interface';
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
  selector: 'app-friend-suggestions',
  templateUrl: './friend-suggestions.component.html',
  styleUrl: './friend-suggestions.component.css'
})
export class FriendSuggestionsComponent implements OnInit {
  //add we do
  storage: any;
  currentUser: ProfileUser | null = null;





  //
  suggestedFriends$: Observable<ProfileUser[]> | undefined;

  constructor(private userService: UsersService
    , private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.suggestedFriends$ = this.userService.getSuggestedFriends();
    //
    firebase.initializeApp(environment.firebase);
    this.storage = firebase.storage();



    this.userService.currentUserProfile$.subscribe(userProfile => {
      if (userProfile) {
        this.currentUser = userProfile;
      }

    });
    //
  }

  viewProfile(friendId: string | undefined) {
    if (friendId) {
      this.router.navigate(['/profile', friendId]).catch(error => {
        console.error('Error navigating to profile:', error);
      });
    }
  }
  async followuser(Friend: any) {

    const userRef = firebase.firestore().collection('Users').doc(this.currentUser?.uid);
    const followed_userRef = firebase.firestore().collection('Users').doc(Friend?.uid);


    console.log(this.currentUser);
    const userDoc = await userRef.get();
    const followed_user = await userRef.get();
    const following = userDoc.data()?.['following'] || [];
    if (following.includes(Friend.displayName)) { 
    
    } else {
      await userRef.update({
        following: firebase.firestore.FieldValue.arrayUnion(Friend.displayName) 
      });
        if (this.currentUser) {
          await followed_userRef.update({
          followers: firebase.firestore.FieldValue.arrayUnion(this.currentUser.displayName)
        });
      }
    }
  }

}
