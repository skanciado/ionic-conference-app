import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JsonDataService {
  data: any;
  menus: any;
  constructor(public http: HttpClient) {}

  getDataJson(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get("assets/data/data.json")
        .pipe(map(this.processData, this));
    }
  }
  async getMenuJson(): Promise<any> {
    if (this.menus) {
      return of(this.menus);
    } else {
      let a = this.http.get("assets/data/menus.json").toPromise();
      return a;
    }
  }

  private processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data;

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.speakers = [];
          if (session.speakerNames) {
            session.speakerNames.forEach((speakerName: any) => {
              const speaker = this.data.speakers.find(
                (s: any) => s.name === speakerName
              );
              if (speaker) {
                session.speakers.push(speaker);
                speaker.sessions = speaker.sessions || [];
                speaker.sessions.push(session);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(
    dayIndex: number,
    queryText = "",
    excludeTracks: any[] = [],
    segment = "all"
  ) {
    return this.getDataJson().pipe(
      map((data: any) => {
        const day = data.schedule[dayIndex];
        day.shownSessions = 0;

        queryText = queryText.toLowerCase().replace(/,|\.|-/g, " ");
        const queryWords = queryText
          .split(" ")
          .filter((w) => !!w.trim().length);

        day.groups.forEach((group: any) => {
          group.hide = true;

          group.sessions.forEach((session: any) => {
            // check if this session should show or not
            this.filterSession(session, queryWords, excludeTracks, segment);

            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              day.shownSessions++;
            }
          });
        });

        return day;
      })
    );
  }

  filterSession(
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === "favorites") {
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.getDataJson().pipe(
      map((data: any) => {
        return data.speakers.sort((a: any, b: any) => {
          const aName = a.name.split(" ").pop();
          const bName = b.name.split(" ").pop();
          return aName.localeCompare(bName);
        });
      })
    );
  }
}
