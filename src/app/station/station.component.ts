import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { YouTubeMediaService } from '../_services/you-tube-media.service';
import { YouTubeMedia } from '../_models/you-tube-media';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.sass']
})
export class StationComponent implements OnInit {
  durationRegexp: RegExp = /P(\d+)?T((\d+)H)?((\d+)M)?((\d+)S)?/g;
  medias = [
    { title: 'Arctic Monkeys - Do I Wanna Know? (Official Video)', image: 'https://i.ytimg.com/vi/bpOSxM0rNPM/default.jpg' },
    { title: 'Arctic Monkeys - R U Mine? (Official Video)', image: 'https://i.ytimg.com/vi/VQH8ZTgna3Q/default.jpg' },
    { title: 'Arctic Monkeys - Four Out Of Five (Official Video)', image: 'https://i.ytimg.com/vi/71Es-8FfATo/default.jpg' },
    { title: 'Arctic Monkeys - Why\'d You Only Call Me When You\'re High? (Official Video)', image: 'https://i.ytimg.com/vi/6366dxFf-Os/default.jpg' },
    { title: 'Arctic Monkeys - Arabella (Official Audio)', image: 'https://i.ytimg.com/vi/Jn6-TItCazo/default.jpg' },
    { title: 'Arctic Monkeys - Arabella (Official Video)', image: 'https://i.ytimg.com/vi/Nj8r3qmOoZ8/default.jpg' },
    { title: 'Arctic Monkeys - Snap Out Of It (Official Video)', image: 'https://i.ytimg.com/vi/H8tLS_NOWLs/default.jpg' },
    { title: 'Arctic Monkeys - One For The Road (Official Video)', image: 'https://i.ytimg.com/vi/qN7gSMPQFss/default.jpg' },
    { title: 'Arctic Monkeys - Anyways (Official Audio)', image: 'https://i.ytimg.com/vi/ytOtPkiw_5g/default.jpg' },
    { title: 'Arctic Monkeys - When The Sun Goes Down (Official Video)', image: 'https://i.ytimg.com/vi/EqkBRVukQmE/default.jpg' },
    { title: 'Arctic Monkeys - Fluorescent Adolescent (Official Video)', image: 'https://i.ytimg.com/vi/ma9I9VBKPiw/default.jpg' },
    { title: '505 lyrics - Arctic Monkeys', image: 'https://i.ytimg.com/vi/iV5VKdcQOJE/default.jpg' },
    { title: 'Arctic Monkeys - Tranquility Base Hotel & Casino (Official Video)', image: 'https://i.ytimg.com/vi/mXuUAtAtMtM/default.jpg' },
  ]
  stationId;
  sub;
  searchControl = new FormControl('');

  constructor(private youTubeService: YouTubeMediaService, private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.stationId = params['radio'];
      console.log(params);
    });
    this.searchControl.valueChanges.subscribe((value: string) => {
      if (/https?:\/\/(www.youtube.com\/watch\?v=[\w\-]+)|(youtu.be\/[\w\-])/g.test(value)) {
        console.log("youtube url found!! " + value);
      } else {
        this.youTubeService.search(this.searchControl.value).subscribe((value) => {
          this.medias = value.reduce((prev: YouTubeMedia[], curr) => {
            const duration = /P(\d+)?T((\d+)H)?((\d+)M)?((\d+)S)?/g.exec(curr.contentDetails.duration);
            prev.push({
              id: curr.id,
              image: curr.snippet.thumbnails.default.url,
              title: curr.snippet.title,
              url: curr.id,
              hours: duration[3],
              minutes: duration[5],
              seconds: duration[7]
            });
            return prev;
          }, []);
        }, (err) => alert(err));
      }
    });
  }

  requestMedia(media: YouTubeMedia, self) {
    this.http.post(`${environment.apiURL}/api/v1/cache/`, {
      uri: media.id,
      url: media.url,
      title: media.title
    }, { responseType: 'text' }).toPromise().then((result) => {
      console.log('cache!'); console.log(result);
      return this.http.post(`${environment.apiURL}/api/v1/radios/${this.stationId}/approval`, {
        mediaId: media.id,
        url: media.url,
        title: media.title
      }).toPromise();
    }).then(result => {
      console.log('station approval!'); console.log(result);
      alert(result['data']['status']);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
