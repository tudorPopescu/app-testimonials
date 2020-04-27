import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiltersComponent } from './components/filters/filters.component';

const routes: Routes = [
  {path: 'country/:id', component: FiltersComponent},
  {path: '', redirectTo: '/country/all', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
