import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../core/actions/login.actions';
import * as fromRoot from '../core/reducers/index.reducer';
import { takeUntil } from 'rxjs/operators';
import { OperationStatusTypes } from '../core/enums/operationStatusTypes.enum';
import { Subject } from 'rxjs';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private operatorString = 'login';
  private destroyed$ = new Subject<boolean>();
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  constructor(private store: Store<fromRoot.State>, private router: Router, public session: SessionStorageService) { }

  usernameFormControl: FormControl = new FormControl('', [
    Validators.required
  ])

  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  ngOnInit(): void {

    this.store.pipe(select(fromRoot.getLogin), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        if (res.login === null || res.login.username === null) {
          this.session.set('username', null);
        } else {
          this.session.set('username', res.login.username);
          this.router.navigate(['deck']);
        }
      }
    });
  }
  dispatchRegister(): void {
    if (this.canLogin()) {
      this.store.dispatch(new fromLogin.Register(this.username.nativeElement.value, this.password.nativeElement.value, this.operatorString));
    } else {
      
    }
  }
  dispatchLogin(): void {
    if (this.canLogin()) {
      this.store.dispatch(new fromLogin.Login(this.username.nativeElement.value, this.password.nativeElement.value, this.operatorString));
    }
  }
  dispatchSignOut(): void {
    this.store.dispatch(new fromLogin.SignOut(this.operatorString));
  }

  canLogin(): boolean {
    let ret = true;
    if(this.usernameFormControl.errors) {
      ret = false;
      this.usernameFormControl.markAsTouched();
    }
    if(this.passwordFormControl.errors) {
      ret = false;
      this.passwordFormControl.markAsTouched();
    }

    return ret;
  }

}
