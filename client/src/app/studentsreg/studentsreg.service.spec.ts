import { TestBed, inject } from '@angular/core/testing';

import { StudentsregService } from './studentsreg.service';

describe('StudentsregService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsregService]
    });
  });

  it('should be created', inject([StudentsregService], (service: StudentsregService) => {
    expect(service).toBeTruthy();
  }));
});
