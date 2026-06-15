import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pokemart } from './pokemart';

describe('Pokemart', () => {
  let component: Pokemart;
  let fixture: ComponentFixture<Pokemart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pokemart],
    }).compileComponents();

    fixture = TestBed.createComponent(Pokemart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
