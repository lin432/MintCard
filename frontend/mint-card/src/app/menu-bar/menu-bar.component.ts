import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLogin from '../core/actions/login.actions';
import * as fromRoot from '../core/reducers/index.reducer';
import { takeUntil } from 'rxjs/operators';
import { OperationStatusTypes } from '../core/enums/operationStatusTypes.enum';
import { Subject } from 'rxjs';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit, OnDestroy {
  private operatorString = 'Menu';
  private destroyed$ = new Subject<boolean>();
  username: string;

  constructor(private store: Store<fromRoot.State>, public session: SessionStorageService) { }

  ngOnInit(): void {
    this.username = this.session.get('username');
    this.store.pipe(select(fromRoot.getLogin), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        if (res.login && res.login.username) {
          this.username = res.login.username;
        } else {
          this.username = null;
        }
      }
    });
  }

  signout(): void {
    this.store.dispatch(new fromLogin.SignOut(this.operatorString));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
