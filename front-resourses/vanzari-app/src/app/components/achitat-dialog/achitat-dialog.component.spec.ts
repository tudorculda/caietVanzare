import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchitatDialogComponent } from './achitat-dialog.component';

describe('AchitatDialogComponent', () => {
  let component: AchitatDialogComponent;
  let fixture: ComponentFixture<AchitatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchitatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchitatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
