import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { StoreModule, reduceState } from '@ngrx/store';
import { reducers } from './core/reducers/index.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DeckEffects } from './deck/effects/deck.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { LoginEffects } from './core/effects/login.effects';
import { CardEffects } from './card/effects/card.effects';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { KibanaElasticEffects } from './kibana-elastic/effects/kibana-elastic.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckEditorComponent } from './deck-editor/deck-editor.component';
import { AdvancedSearchDialogComponent } from './advanced-search-dialog/advanced-search-dialog.component';
import { AngularSplitModule } from 'angular-split';
import { VisualizationComponent } from './visualization/visualization.component';
import { CardPropertiesComponent } from './card/card-properties/card-properties.component';
import { DescriptionDialogComponent } from './deck-editor/description-dialog/description-dialog.component';
import { CardImageEffects } from './card/effects/card-image.effects';
import { CreditsComponent } from './credits/credits.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    LoginComponent,
    SearchComponent,
    MenuBarComponent,
    DashboardComponent,
    DeckEditorComponent,
    AdvancedSearchDialogComponent,
    VisualizationComponent,
    CardPropertiesComponent,
    DescriptionDialogComponent,
    CreditsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DeckEffects, LoginEffects, CardEffects, KibanaElasticEffects, CardImageEffects]),
    StoreDevtoolsModule.instrument(),
    AngularSplitModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
