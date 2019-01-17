import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageComponent } from './manage/manage.component';
import { StationComponent } from './station/station.component';
import { MobileComponent } from './mobile/mobile.component';
import { LandingComponent } from './landing/landing.component';
import { UserGuard } from './_guards/user.guard'

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users/:userid/:username', component: ManageComponent, canActivate: [UserGuard] },
  { path: 'users/:userid/:username/:list', component: ManageComponent, canActivate: [UserGuard] },
  { path: 'radios/:radio/live', component: MobileComponent },
  { path: 'radios/:radio', component: StationComponent },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
