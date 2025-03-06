import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionUploadComponent } from './production-upload.component';

describe('ProductionUploadComponent', () => {
  let component: ProductionUploadComponent;
  let fixture: ComponentFixture<ProductionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
