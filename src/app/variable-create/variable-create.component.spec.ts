import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableCreateComponent } from './variable-create.component';

describe('VariableCreateComponent', () => {
  let component: VariableCreateComponent;
  let fixture: ComponentFixture<VariableCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
