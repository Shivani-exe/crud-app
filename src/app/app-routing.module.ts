import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './shared/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'signupUsersList', component: LoginComponent },
  { path: 'productList', component: TableComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
