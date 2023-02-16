import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "@pages/login/login.component";
import {ProfileComponent} from "@pages/profile/profile.component";
import {AuthGuard} from "@guards/auth.guard";
import {LoginRedirectGuard} from "@guards/login-redirect.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginRedirectGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
