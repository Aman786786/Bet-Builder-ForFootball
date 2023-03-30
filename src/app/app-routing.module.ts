import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

const routes: Routes = [
  { path: '', component: DateSelectorComponent },

  { path: 'match-details/:id', component: MatchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
