/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopNavTitleService } from './top-nav-title.service';

describe('Service: TobNavTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopNavTitleService]
    });
  });

  it('should ...', inject([TopNavTitleService], (service: TopNavTitleService) => {
    expect(service).toBeTruthy();
  }));
});
