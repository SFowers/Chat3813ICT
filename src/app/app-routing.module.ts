import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { SuperControlsComponent } from './super-controls/super-controls.component';

const routes: Routes = [{path: 'login', component: LoginComponent},
                        {path: 'account', component: AccountComponent},
                        {path: 'signup', component: SignupComponent},
                        {path: 'chat', component: ChatComponent},
                        {path: 'groups', component: GroupsComponent},
                        {path: 'group/:groupname', component: GroupComponent},
                        {path: 'super', component: SuperControlsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
