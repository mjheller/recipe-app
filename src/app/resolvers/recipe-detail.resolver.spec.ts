import { TestBed } from '@angular/core/testing';

import { RecipeDetailResolver } from './recipe-detail.resolver';

describe('RecipeDetailResolver', () => {
  let resolver: RecipeDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipeDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
