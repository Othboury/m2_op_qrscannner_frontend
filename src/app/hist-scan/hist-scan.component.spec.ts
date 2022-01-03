import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistScanComponent } from './hist-scan.component';

describe('HistScanComponent', () => {
  let component: HistScanComponent;
  let fixture: ComponentFixture<HistScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
