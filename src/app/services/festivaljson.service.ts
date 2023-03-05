import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Festival } from 'src/app/models/festival';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class FestivaljsonService {
  constructor(private http: HttpClient) {}
  json2Festival(json: any): Festival {
    return new Festival(
      json.id,
      json.name,
      json.tablemax_1,
      json.tablemax_2,
      json.tablemax_3,
      json.tableprice_1,
      json.tableprice_3,
      json.sqmprice_1,
      json.sqmprice_2,
      json.sqmprice_3,
      json.editor
    );
  }
  getFestivals(): Observable<Festival[]> {
    return this.http
      .get<Festival[]>('http://localhost:3000/festivals')
      .pipe(map((data) => data.map((json) => this.json2Festival(json))));
  }  
  getFestival(id: string): Observable<Festival> {
    return this.http
      .get<Festival>(`http://localhost:3000/festivals/${id}`)
      .pipe(map((data) => {
        return this.json2Festival(data)
      }));
  }
}
