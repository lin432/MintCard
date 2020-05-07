import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as fromRoot from '../core/reducers/index.reducer';
import { Store, select } from '@ngrx/store';
import { OperationStatusTypes } from '../core/enums/operationStatusTypes.enum';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { Card } from '../card/models/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  username: string;
  addCardObs: Subject<Card> = new Subject<Card>();

  split: SplitComponent;
  area1: SplitAreaDirective;
  area2: SplitAreaDirective;

  direction = 'horizontal';

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fromRoot.getLogin), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operationStatus === OperationStatusTypes.CompletedFailure || !res.login) {
        this.router.navigate(['']);
      }
    });

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.addCardObs.complete();
  }

  addToDeck(event) {
    this.addCardObs.next(event);
  }


}
