import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeMediaComponent } from './you-tube-media.component';

describe('YouTubeMediaComponent', () => {
  let component: YouTubeMediaComponent;
  let fixture: ComponentFixture<YouTubeMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouTubeMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
