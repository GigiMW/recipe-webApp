import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fixed typo from "styleUrl" to "styleUrls"
})
export class HeaderComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  // navigateToProfile() {
  //   this.user$.subscribe(user => {
  //     if (user) {
  //       this.router.navigate(['/profile', user]);
  //     }
  //   });
  }
