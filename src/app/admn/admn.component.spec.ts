import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnComponent } from './admn.component';

describe('AdmnComponent', () => {
  let component: AdmnComponent;
  let fixture: ComponentFixture<AdmnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
