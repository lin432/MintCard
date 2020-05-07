import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../core/reducers/index.reducer';
import * as fromKibanaElastic from '../kibana-elastic/actions/kibana-elastic.actions';
import {Dictionary} from '@ngrx/entity';
import {Visualizations} from '../kibana-elastic/model/visualizations.model';
import {takeUntil} from 'rxjs/operators';
import {OperationStatusTypes} from '../core/enums/operationStatusTypes.enum';
import {Subject} from 'rxjs';
import {Deck} from '../deck/models/deck.model';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  private operatorString = 'KibanaElastic';
  private destroyed$ = new Subject<boolean>();
  visualizationURLs = {
    CMC: null,
    CMCHeatMap: null,
    CardTypeBar: null
  };
  visualizations: string[] = [];
  visualizationNames: string[] = [];
  currentUsername = '...';
  show = false;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromRoot.getKibanaElastic), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operationStatus === OperationStatusTypes.CompletedSuccess) {

        // update vis urls if we have them
        if (res.elasticIntialized) {
          this.show = true;
          this.visualizationURLs = res.visualizations ? res.visualizations : {CMC: null, CMCHeatMap: null, CardTypeBar: null};
        }
        // create vis if elastic is up but no urls
        if (this.visualizationNames.length > 0
          && Object.keys(this.visualizationURLs).length < this.visualizations.length) {
          this.store.dispatch(new fromKibanaElastic.VisualizeKibana(this.visualizations, this.operatorString));
        }
      }
    });

  }

  toggleChange(name: string, e): void {
    const index = this.visualizationNames.indexOf(name);
    if (e.checked) {
      if (index < 0) {
        this.visualizationNames.push(name);
      }
    } else {
      if (index > -1) {
        this.visualizationNames.splice(index, 1);
      }
    }

    this.dispatchKibanaVisualize();
  }

  dispatchKibanaVisualize(): void {
    this.visualizations = this.visualizationNames.slice();
    this.show = false;
    this.store.dispatch(new fromKibanaElastic.VisualizeKibana(this.visualizations, this.operatorString));
  }

  dispatchCleanKibana(): void {
    this.store.dispatch(new fromKibanaElastic.CleanKibana(this.operatorString));
  }
}
