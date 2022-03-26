import { Component, OnInit } from '@angular/core';

import { CharacterService } from './../../../../shared/services/character.service';
import { Character } from './../../../../shared/interfaces/character.interface';

import { filter, take } from 'rxjs/operators'
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

type RequestInfo = {
  next:any
}


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  info: RequestInfo = {
    next:null,
  };

  private pageNum = 1;
  private query: string = '';

  p: number = 1;

  constructor(private characterSvc: CharacterService, private route: ActivatedRoute, private router: Router) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    //this.getDataFromService();
    this.getCharactersByQuery();
  }
  private onUrlChanged(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(
      () => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      }
    )
  }
  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe( (params: Params) => {
        console.log(params)
        this.query = params['q']
        this.getDataFromService();
      })
  }

  private getDataFromService(): void {
    this.characterSvc.searchCharacters(this.query, this.pageNum).pipe(
      take(1)
    ).subscribe((res:any) => {
      if(res?.results?.length) {
        const {info, results} = res;
        this.characters = [...this.characters, ...results]
        this.info = info;
        console.log(this.characters, this.info)
      } else {
        this.characters = [];
      }
    });
  }

}
