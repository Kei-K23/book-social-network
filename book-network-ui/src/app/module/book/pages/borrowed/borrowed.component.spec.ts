import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedComponent } from './borrowed.component';

describe('BorrowedComponent', () => {
  let component: BorrowedComponent;
  let fixture: ComponentFixture<BorrowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
