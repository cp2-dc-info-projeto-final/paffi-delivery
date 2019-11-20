import { TestBed } from '@angular/core/testing';

import { RealtimeService } from './realtime.service';

describe('RealtimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealtimeService = TestBed.get(RealtimeService);
    expect(service).toBeTruthy();
  });
});
