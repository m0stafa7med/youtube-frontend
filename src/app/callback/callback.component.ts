import { Component } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {

  constructor(private userService: UserService, private router: Router) {
    this.userService.registerUser();
    this.router.navigateByUrl('');
  }
}
