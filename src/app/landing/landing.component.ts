import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  stations = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(`${environment.apiURL}/api/v1/radios/`).toPromise().then(result => {
      this.stations = result['data'];
    });
  }

  select(station) {
    this.router.navigateByUrl(`/radios/${station._id}`);
  }
}
