import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeDetailsComponent } from './episode-details.component';

const routes: Routes = [{ path: '', component: EpisodeDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodeDetailsRoutingModule { }
