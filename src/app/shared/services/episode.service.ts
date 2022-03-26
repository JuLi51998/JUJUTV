import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.prod';
import { Episode } from '../interfaces/episode.interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient) { }


  searchEpisode(query='', page=1) {
    return this.http.get<Episode[]>(`${environment.baseUrlAPI}/character/?name=${query}&page=${page}`)
  }

  getEpisodeDetails(id: number) {
    return this.http.get<Episode[]>(`${environment.baseUrlAPI}/character/${id}`)
  }
}
