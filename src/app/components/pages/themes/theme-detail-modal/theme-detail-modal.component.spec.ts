import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailModalComponent } from './theme-detail-modal.component';

describe('ThemeDetailModalComponent', () => {
  let component: ThemeDetailModalComponent;
  let fixture: ComponentFixture<ThemeDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
