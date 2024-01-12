import { ValidatorService } from './../../services/validator/validator.service';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AlertService } from 'src/app/services/alert/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticateService,
    private alertService: AlertService,
    private validatorService: ValidatorService
  ) {}

  user: LoginRequest = new LoginRequest();

  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('senhaInput') senhaInputElement!: ElementRef;

  ngOnInit(): void {}

  onSubmit() {
    if (this.formValidator()) {
      this.authenticationService.login(this.user).subscribe(
        (result) => {
          localStorage.setItem('token', result.token);
          this.alertService.showSuccessAlert(
            environment.loginSucess,
            environment.sucess
          );

          setTimeout(() => {
            window.location.href = '/home';
          }, 1000);
        },
        (error) => {
          if (error.error.message != null) {
            this.alertService.showErrorAlert(
              error.error.message,
              environment.loginFailed
            );
          } else {
            this.alertService.showErrorAlert(
              environment.loginErrorContactSupport,
              environment.errorPhrase
            );
          }
        }
      );
    }
  }

  private formValidator(): boolean {
    if (!this.user.senha && !this.user.email) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        environment.loginErrorEmailPasswordNull,
        environment.requiredFields
      );
      return false;
    } else if (!this.validatorService.isEmail(this.user.email)) {
      this.emailInputElement.nativeElement.value = '';
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        environment.writeValidEmail,
        environment.invalidEmail
      );
      return false;
    } else if (!this.user.senha) {
      this.senhaInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        environment.writePassword,
        environment.requiredField
      );
      return false;
    } else if (!this.user.email) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        environment.writeEmail,
        environment.requiredField
      );

      return false;
    }

    return true;
  }
}
