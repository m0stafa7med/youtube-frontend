import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        this.userService.registerUser().subscribe({
          next: () => {
            this.router.navigateByUrl('/featured');
          },
          error: () => {
            this.router.navigateByUrl('/featured');
          }
        });
      } else {
        this.router.navigateByUrl('/featured');
      }
    });
  }
}
