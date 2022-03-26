import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EpisodeListComponent } from './../episodes/episode-list/episode-list.component';
import { EpisodeDetailsComponent } from './../episodes/episode-details/episode-details.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module




@NgModule({
  declarations: [
    EpisodeDetailsComponent,
    EpisodeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NgxPaginationModule
  ],
  exports: [
    EpisodeDetailsComponent,
    EpisodeListComponent
  ]
})
export class EpisodesModule { }
