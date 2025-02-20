import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableUpdateComponent } from './variable-update.component';

describe('VariableUpdateComponent', () => {
  let component: VariableUpdateComponent;
  let fixture: ComponentFixture<VariableUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
