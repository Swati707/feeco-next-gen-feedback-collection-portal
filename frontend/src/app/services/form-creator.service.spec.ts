import { TestBed, inject } from '@angular/core/testing';

import { FormCreatorService } from './form-creator.service';

describe('FormCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormCreatorService]
    });
  });

  it('should be created', inject([FormCreatorService], (service: FormCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
