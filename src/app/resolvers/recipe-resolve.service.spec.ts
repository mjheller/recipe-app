import { TestBed } from '@angular/core/testing';

import { RecipeResolveService } from './recipe-resolve.service';

describe('RecipeResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeResolveService = TestBed.get(RecipeResolveService);
    expect(service).toBeTruthy();
  });
});
