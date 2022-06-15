import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsmapComponent } from './jsmap.component';

describe('JsmapComponent', () => {
  let component: JsmapComponent;
  let fixture: ComponentFixture<JsmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
