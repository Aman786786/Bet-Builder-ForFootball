import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fixture } from './fixture';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FixtureService {
  constructor(private http: HttpClient) {}
  private url = 'http://cms.bettorlogic.com/api/BetBuilder/GetFixtures';
  AllFixture: Fixture[];

  getFixtures(date: Date): Observable<Fixture[]> {
    const dateString = moment(date).format('MM/DD/YYYY');
    const url = `http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1&date=${dateString}`;
    return this.http.get<Fixture[]>(url);
  }

  getFixtureById(id: number): Observable<Fixture> {
    const url = `http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=${id}`;
    return this.http.get<Fixture>(url);
  }
}
