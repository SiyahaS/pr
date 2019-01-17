import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.sass']
})
export class MobileComponent implements OnInit {
  playing = { title: '', image: '' };
  songs = [];
  streamId;
  address;
  environment = environment;
  @ViewChild('videoPlayer') videoPlayer: any;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.streamId = params['radio']
      console.log(this.streamId);
      // TODO does not work
      /*this.http.get(`${environment.apiURL}/api/v1/radios/${this.streamId}/live`).toPromise().then(result => {
        console.log(result);
        this.address = result['data']['address'];
        /*this.videoPlayer.nativeElement.src = result['data']['address'] + '/api/v1/encoder/live.mpd';
        this.videoPlayer.nativeElement.play()
      });*/
    });
  }
  play() {
    this.videoPlayer.nativeElement.play();
    // TODO does not work
    /*console.log(this.videoPlayer.nativeElement);
    this.videoPlayer.nativeElement.src = this.address + '/api/v1/encoder/live.mpd';
    this.videoPlayer.nativeElement.oncanplay = () => {
      console.log('ready');
      this.videoPlayer.nativeElement.play();
    };*/
  }
}
