import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YouTubeMedia } from '../_models/you-tube-media';

@Component({
  selector: 'app-you-tube-media',
  templateUrl: './you-tube-media.component.html',
  styleUrls: ['./you-tube-media.component.sass']
})
export class YouTubeMediaComponent implements OnInit {
  @Input() media: YouTubeMedia;
  @Output() mediaSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  requestMedia() {
    this.mediaSelected.emit(this.media);
  }
}
