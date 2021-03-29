import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodsGrowthComponent } from './moods-growth.component';

describe('MoodsGrowthComponent', () => {
  let component: MoodsGrowthComponent;
  let fixture: ComponentFixture<MoodsGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodsGrowthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodsGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
