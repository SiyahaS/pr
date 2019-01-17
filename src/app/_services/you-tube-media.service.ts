import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { YouTubeSearchResult } from '../_models/you-tube-search-result';
import { YouTubeSearchListResponse } from '../_models/you-tube-search-list-response';
import { YouTubeVideoListResponse } from '../_models/you-tube-video-list-response';
import { ReplaySubject, Subject } from 'rxjs';
import { YouTubeVideo } from '../_models/you-tube-video';

@Injectable({
  providedIn: 'root'
})
export class YouTubeMediaService implements OnInit {
  subject: ReplaySubject<YouTubeVideo[]> = new ReplaySubject(1);
  last: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search(query): ReplaySubject<YouTubeVideo[]> {
    this.last = query;
    this.http.get(`${environment.apiURL}/api/v1/youtube/search`, {
      params: {
        q: query
      }
    }).toPromise().then((result: YouTubeSearchListResponse) => {
      let videoIds = result.items.reduce((prev: string[], curr) => {
        prev.push(curr.id.videoId);
        return prev;
      }, []);

      return this.http.get(`${environment.apiURL}/api/v1/youtube/duration`, {
        params: {
          videos: videoIds
        }
      }).toPromise();
    }).then((result: YouTubeVideoListResponse) => {
      if (this.last === query) {
        this.subject.next(result.items);
      }
    }).catch((err) => {
      console.log("[YouTubeService] " + err);
      this.subject.error(err);
    });
    return this.subject;
  }
}
