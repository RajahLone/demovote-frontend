import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionUpdateComponent } from './production-update.component';

describe('ProductionUpdateComponent', () => {
  let component: ProductionUpdateComponent;
  let fixture: ComponentFixture<ProductionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
