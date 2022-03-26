import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Episode } from '@app/shared/interfaces/episode.interface';
import { EpisodeService } from '@app/shared/services/episode.service';
import { filter, take } from 'rxjs/operators';


type RequestInfo = {
  next:any
}

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  episodes: Episode[] = [];
  info: RequestInfo = {
    next:null,
  };

  private pageNum = 1;
  private query: string = '';
  p: number =1;

  constructor(private episodeSvc: EpisodeService, private route: ActivatedRoute, private router: Router) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getEpisodesByQuery();
  }

  private onUrlChanged(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(
      () => {
        this.episodes = [];
        this.pageNum = 1;
        this.getEpisodesByQuery();
      }
    )
  }
  private getEpisodesByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe( (params: Params) => {
        console.log(params)
        this.query = params['q']
        this.getDataFromService();
      })
  }

  private getDataFromService(): void {
    this.episodeSvc.searchEpisode(this.query, this.pageNum).pipe(
      take(1)
    ).subscribe((res:any) => {
      if(res?.results?.length) {
        const {info, results} = res;
        this.episodes = [...this.episodes, ...results]
        this.info = info;
        console.log(this.episodes, this.info)
      } else {
        this.episodes = [];
      }
    });
  }

}
