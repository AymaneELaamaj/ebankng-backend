import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBycustomerComponent } from './account-bycustomer.component';

describe('AccountBycustomerComponent', () => {
  let component: AccountBycustomerComponent;
  let fixture: ComponentFixture<AccountBycustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountBycustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountBycustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
