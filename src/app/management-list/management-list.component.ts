import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.sass']
})
export class ManagementListComponent implements OnInit {
  @Input() buttons;
  @Input() title;
  @Input() sessionStorage;
  @Output() buttonPressed = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
