import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }
  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then((response) => {
        this.flashMessagesService.show(
          'You are logged in', 
          { cssClass: 'alert-success', timeout: 4000 }
        );
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessagesService.show(
          error.message, 
          { cssClass: 'alert-danger', timeout: 4000 }
        );
        this.router.navigate(['/login']); // Check that this is necessary.
      });
  }
}
