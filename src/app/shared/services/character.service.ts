import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Character } from '../interfaces/character.interface';
import { environment } from '@environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacters(query='', page=1) {
    return this.http.get<Character[]>(`${environment.baseUrlAPI}/character/?name=${query}&page=${page}`)
  }

  getDetails(id: number) {
    return this.http.get<Character[]>(`${environment.baseUrlAPI}/character/${id}`)
  }
}
