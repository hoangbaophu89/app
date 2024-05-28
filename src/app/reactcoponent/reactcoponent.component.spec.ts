import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactcoponentComponent } from './reactcoponent.component';

describe('ReactcoponentComponent', () => {
  let component: ReactcoponentComponent;
  let fixture: ComponentFixture<ReactcoponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactcoponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactcoponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
