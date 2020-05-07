import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { LoginComponent } from './login/login.component';
import { CreditsComponent } from './credits/credits.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'deck',
    component: DashboardComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
