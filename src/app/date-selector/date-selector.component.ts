import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Fixture } from '../fixture';
import { FixtureService } from '../fixture.service';

interface League {
  name: string;
  matches: Fixture[];
}

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css'],
})
export class DateSelectorComponent {
  days: Date[] = [];
  selectedDate: Date;
  matches: League[] = [];
  leagues: string[] = [];
  selectedMatch: Fixture;

  constructor(private fixtureService: FixtureService, private router: Router) {
    this.generateDays();
    this.selectedDate = this.days[0];
    this.loadMatches();
  }

  selectDate(day: Date) {
    this.selectedDate = day;
    this.loadMatches();
  }

  selectMatch(match: Fixture) {
    this.selectedMatch = match;
    localStorage.setItem('selectedMatch', JSON.stringify(this.selectedMatch));
    this.router.navigate(['/match-details', match.MatchId]);
  }

  private generateDays() {
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days').toDate();
      this.days.push(date);
    }
  }

  private loadMatches() {
    this.fixtureService.getFixtures(this.selectedDate).subscribe((matches) => {
      this.matches = [];
      const leagues = new Map<string, League>();
      for (const match of matches) {
        const matchDate = moment(match.MatchDate, 'MM/DD/YYYY');
        if (matchDate.isSame(this.selectedDate, 'day')) {
          const localKickoff = moment.utc(match.KickOffUtc).local().toDate();
          const league = leagues.get(match.LeagueId);
          if (!league) {
            leagues.set(match.LeagueId, {
              name: match.LeagueName,
              matches: [{ ...match, KickOffLocalTime: localKickoff }],
            });
            this.leagues.push(match.LeagueName);
          } else {
            league.matches.push({ ...match, KickOffLocalTime: localKickoff });
          }
        }
      }
      leagues.forEach((league) => {
        league.matches.sort((a, b) => a.KickOffUtc.localeCompare(b.KickOffUtc));
        this.matches.push(league);
      });
    });
  }
}
export { Fixture };
