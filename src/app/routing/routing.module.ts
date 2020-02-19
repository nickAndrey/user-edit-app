import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserEditComponent} from '../user-edit/user-edit.component';

const appRoutes: Routes = [
  {path: '', component: UserEditComponent},
];

const RoutesConfig = [RouterModule.forRoot(appRoutes)];

@NgModule({
  imports: [RoutesConfig],
  exports: [RoutesConfig]
})
export class RoutingModule {
}
