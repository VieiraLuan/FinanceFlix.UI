import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/app/models/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  user: LoginRequest = new LoginRequest();

  ngOnInit(): void {}

  onSubmit() {}
}
