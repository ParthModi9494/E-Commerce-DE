import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [{
  path: '',
  component: IndexComponent,
  canActivate: [LoginGuard],
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
