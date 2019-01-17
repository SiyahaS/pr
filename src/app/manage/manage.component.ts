import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { readElementValue } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.sass']
})
export class ManageComponent implements OnInit {
  username;
  userid;
  list;
  stream;
  title;
  songs;
  buttons;
  // buttons = [{ icon: 'check' }, { icon: 'delete' }, { icon: 'delete_forever' }, { icon: 'favorite' }];
  private sub: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userid = params['userid'];
      this.list = params['list'];
      this.http.get(`${environment.apiURL}/api/v1/users/${this.userid}/streams`).toPromise().then((result) => {
        this.stream = result['data'];
        this.queue();
      });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  approval() {
    var f = (song, action) => {
      this.http.post(`${environment.apiURL}/api/v1/radios/${this.stream._id}/approval/${song._id}`, { action: action })
        .toPromise()
        .then(result => {
          song['hidden'] = true;
        });
    };
    this.title = 'Approvals';
    this.buttons = [{
      icon: 'check', click: (song) => {
        f(song, 'approve');
      }
    }, {
      icon: 'delete', click: (song) => {
        f(song, 'delete');
      }
    }, {
      icon: 'delete_forever', click: (song) => {
        f(song, 'blacklist');
      }
    }, {
      icon: 'favorite', click: (song) => {
        f(song, 'whitelist');
      }
    }];
    this.http.get(`${environment.apiURL}/api/v1/radios/${this.stream._id}/approval`).toPromise().then(result => {
      this.songs = result['data'];
    });
  }
  queue() {
    this.buttons = [{
      icon: 'delete', click: (song) => {
        this.http.delete(`${environment.apiURL}/api/v1/radios/${this.stream._id}/queue/${song._id}`)
          .toPromise()
          .then(result => {
            song['hidden'] = true;
          });
      }
    }];
    this.title = 'Queue';
    this.http.get(`${environment.apiURL}/api/v1/radios/${this.stream._id}/queue`).toPromise().then(result => {
      this.songs = result['data'];
    });
  }
  whitelist() {
    this.buttons = [{
      icon: 'delete', click: (song) => {
        this.http.delete(`${environment.apiURL}/api/v1/radios/${this.stream._id}/whitelist/${song._id}`)
          .toPromise()
          .then(result => {
            song['hidden'] = true;
          });
      }
    }];
    this.title = 'Whitelist';
    this.http.get(`${environment.apiURL}/api/v1/radios/${this.stream._id}/whitelist`).toPromise().then(result => {
      this.songs = result['data'];
    });
  }
  blacklist() {
    this.buttons = [{
      icon: 'delete', click: (song) => {
        this.http.delete(`${environment.apiURL}/api/v1/radios/${this.stream._id}/blacklist/${song._id}`)
          .toPromise()
          .then(result => {
            song['hidden'] = true;
          });
      }
    }];
    this.title = 'Blacklist';
    this.http.get(`${environment.apiURL}/api/v1/radios/${this.stream._id}/blacklist`).toPromise().then(result => {
      this.songs = result['data'];
    });
  }
}
