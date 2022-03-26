import { CharacterService } from './../../../../shared/services/character.service';
import { Character } from './../../../../shared/interfaces/character.interface';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: Array<Character>= [];

  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location: Location) {

  }

  ngOnInit(): void {
    this.route.params.pipe().subscribe((param) => {
      const id = param['id'];
      this.characterSvc.searchCharacters(id).subscribe((res) => {
        this.character = res;
        console.log(this.character)
      });
    })
  }

  onGoBack() {
    this.location.back();
  }

}
