import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId$: Observable<string | undefined> | undefined;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userId$ = this.authService.currentUser$.pipe(
      map(user => user?.uid)
    );
  }
}
