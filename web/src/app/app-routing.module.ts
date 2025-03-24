import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { ManageDhcpPoolsComponent } from './manage-dhcp-pools/manage-dhcp-pools.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { ManageImagesComponent } from './manage-images/manage-images.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { LoginComponent } from './login/login.component';
import { LogsComponent } from './logs/logs.component';
import { DeploymentsComponent } from './deployments/deployments.component';
import { HealthChecksComponent } from './health-checks/health-checks.component';


const routes: Routes = [
  { path: 'manage-dhcp-pools', component: ManageDhcpPoolsComponent },
  { path: 'manage-groups', component: ManageGroupsComponent },
  { path: 'manage-images', component: ManageImagesComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'deployments', component: DeploymentsComponent },
  { path: 'health-checks', component: HealthChecksComponent },
  { path: 'help', component: HelpComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: '', component: ManageDhcpPoolsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
