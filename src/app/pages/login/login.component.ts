import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { showDialog } from 'src/app/store/actions/application.actions';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private loginSubscription: Subscription;

  constructor(
    private store: Store,
    private titleService: Title,
    private router: Router,
    private authenticationService: AuthenticationService,
    public utilitiesService: UtilitiesService
  ) {
    this.titleService.setTitle('Masuk');
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription && this.loginSubscription.unsubscribe();
  }

  get emailOrUsername() {
    return this.loginForm.controls.emailOrUsername;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.store.dispatch(showDialog({
        config: {
          data: {
            message: 'Inputan tidak boleh kosong!',
            buttonText: {
              close: 'OK'
            }
          }
        }
      }));
    } else {
      this.loginSubscription = this.authenticationService.login(this.emailOrUsername.value, this.password.value).subscribe(res => {
        if (!res.response.status) {
          this.store.dispatch(showDialog({
            config: {
              data: {
                message: res.response.text,
                buttonText: {
                  close: 'OK'
                }
              }
            }
          }));
        } else {
          this.router.navigate(['/main']);
        }
      });
    }
  }
}
