import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {path:"",
    redirectTo:"/Login",
    pathMatch:"full"},
    {path:"Login",component:LoginComponent},
    {path:"Home",component:HomeComponent},
    {path:"**",redirectTo:"/Home"}
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes),
    ]
})
export class AppRoutingModule{

}