import { TestBed } from '@angular/core/testing';

import { YouTubeMediaService } from './you-tube-media.service';

describe('YouTubeMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YouTubeMediaService = TestBed.get(YouTubeMediaService);
    expect(service).toBeTruthy();
  });
});
