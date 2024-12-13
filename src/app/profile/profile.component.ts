import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { ProfileUser } from '../user.interface';
import { ImageUploadService } from '../image-uploaded.service';
import { UsersService } from '../users.service';
import { RecipeService } from '../recipe.service';
import { AuthenticationService } from '../authentication.service';
import { Recipe } from '../recipe.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FollowersPopupComponent } from '../followers-popup/followers-popup.component';
import { FollowingComponent } from '../following/following.component';import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<ProfileUser | null> | undefined;
  recipes$: Observable<Recipe[]> | undefined;
  profileForm: FormGroup;
  currentUserUid: string | undefined;

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,private router:Router,
    private authenticationService: AuthenticationService 
  ) {
    this.profileForm = this.fb.group({
      uid: [''],
      displayName: [''],
    });
  }
  ngOnInit(): void {
    this.authenticationService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserUid = user.uid;
      }
    });

    this.user$ = this.route.params.pipe(
      switchMap(params => {
        if (params['uid']) {
          return this.usersService.getUser(params['uid']);
        } else {
          return this.usersService.currentUserProfile$;
        }
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        return of(null);
      })
    );

    if (this.user$) {
      this.user$
        .pipe(
          tap(user => {
            if (user && user.uid) {
              this.profileForm.patchValue({ ...user });
              this.loadRecipes(user.uid);
            }
          })
        )
        .subscribe();
    }
  }
openFollowersPopup(): void {
    const dialogRef = this.dialog.open(FollowersPopupComponent, {
      width: '1000px', // Adjust width as needed
    });
  }
  openFollowingPopup(): void {
    const dialogRef = this.dialog.open(FollowingComponent, {
      width: '1000px', // Adjust width as needed
    });
  }
  loadRecipes(uid: string) {
    this.recipes$ = this.recipeService.getRecipesByUser(uid);
  }

  uploadFile(event: any, { uid }: ProfileUser) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }
showRecipeDetails(recipeId: string) {
    this.router.navigate(['/details', recipeId]);
  }
  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
  }
  deleteRecipe(recipeId: string) {
    if (!recipeId) {
      return;
    }
  
    this.recipeService.deleteRecipe(recipeId)
      .pipe(
        this.toast.observe({
          loading: 'Deleting recipe...',
          success: 'Recipe deleted successfully',
          error: 'There was an error in deleting the recipe',
        })
      )
      .subscribe(() => {
        if (this.user$) {
          this.user$.subscribe(user => {
            if (user && user.uid) {
              this.loadRecipes(user.uid);
            }
          });
        }
      });
  }
}
