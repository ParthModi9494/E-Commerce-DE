import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { IndexModule } from './components/index/index.module';
import { HomeModule } from './components/home/home.module';
import { NoPageModule } from './components/no-page/no-page.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index', loadChildren: './components/index/index.module#IndexModule' },
  { path: '**', component: NoPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, IndexModule, NoPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
