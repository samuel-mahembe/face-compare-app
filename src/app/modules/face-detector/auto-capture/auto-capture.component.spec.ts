import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCaptureComponent } from './auto-capture.component';

describe('AutoCaptureComponent', () => {
  let component: AutoCaptureComponent;
  let fixture: ComponentFixture<AutoCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoCaptureComponent]
    });
    fixture = TestBed.createComponent(AutoCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
