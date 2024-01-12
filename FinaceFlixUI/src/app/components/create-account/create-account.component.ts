import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'src/app/models/UserAccount';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor() {}

  account: UserAccount = new UserAccount();
  secondPasswordValue: string = '';
  adminPasswordValue: string = '';

  ngOnInit(): void {}

  onSubmit() {
    console.log('teste');
  }
}
