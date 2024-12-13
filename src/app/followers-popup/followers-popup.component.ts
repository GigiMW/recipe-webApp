import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { AuthenticationService } from '../authentication.service';
import { ProfileUser } from '../user.interface'
@Component({
  selector: 'app-followers-popup',
  templateUrl: './followers-popup.component.html',
  styleUrls: ['./followers-popup.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class FollowersPopupComponent implements OnInit {
  users$: Observable<ProfileUser | null> | undefined;
 //followers$!: Observable<ProfileUser[]>;followers!: ProfileUser[];
  followers$: Observable<any[]> | undefined; // Adjust the type according to your follower data structure
  isPopupVisible: boolean = true;
  constructor(public usersService: UsersService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user?.uid) {
        this.followers$ = this.usersService.getFollowersByUser(user.uid);
      } else {

      }
      console.log('Followers:', this.followers$);
    });
  }
   loadFollowers(uid: string) {
     this.followers$ = this.usersService.getFollowersByUser(uid);

  }
  closePopup() {

    this.isPopupVisible = false;
  }


  // loadFollowers(userName: string) {
  //   this.usersService.getFollowers(userName)
  //     .subscribe(
  //       (followers) => {
  //         this.followers = followers;
  //         console.log('Followers:', this.followers);
  //       },
  //       (error) => {
  //         console.error('Error fetching followers:', error);
  //         // Handle error
  //       }
  //     );
  // }
}
