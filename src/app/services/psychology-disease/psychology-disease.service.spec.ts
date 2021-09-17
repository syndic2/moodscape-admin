import { TestBed } from '@angular/core/testing';

import { PsychologyDiseaseService } from './psychology-disease.service';

describe('PsychologyDiseaseService', () => {
  let service: PsychologyDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologyDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
