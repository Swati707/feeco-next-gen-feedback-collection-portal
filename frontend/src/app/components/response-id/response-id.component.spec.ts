import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseIdComponent } from './response-id.component';

describe('ResponseIdComponent', () => {
  let component: ResponseIdComponent;
  let fixture: ComponentFixture<ResponseIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
