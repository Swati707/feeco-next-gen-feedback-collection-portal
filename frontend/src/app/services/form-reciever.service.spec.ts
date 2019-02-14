import { TestBed, inject } from '@angular/core/testing';

import { FormRecieverService } from './form-reciever.service';

describe('FormRecieverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormRecieverService]
    });
  });

  it('should be created', inject([FormRecieverService], (service: FormRecieverService) => {
    expect(service).toBeTruthy();
  }));
});
