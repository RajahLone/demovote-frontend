import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieUpdateComponent } from './categorie-update.component';

describe('CategorieUpdateComponent', () => {
  let component: CategorieUpdateComponent;
  let fixture: ComponentFixture<CategorieUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
