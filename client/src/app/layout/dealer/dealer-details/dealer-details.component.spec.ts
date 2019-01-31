import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetailsComponent } from './dealer-details.component';

describe('DealerDetailsComponent', () => {
  let component: DealerDetailsComponent;
  let fixture: ComponentFixture<DealerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
