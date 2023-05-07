import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateFileComponent } from './create-file/create-file.component';

const routes: Routes = [
  {path:'', component:LandingPageComponent},
  {path:'c', component:CreateFileComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule {}