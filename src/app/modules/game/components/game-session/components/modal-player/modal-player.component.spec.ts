import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlayerComponent } from './modal-player.component';

describe('ModalPlayerComponent', () => {
  let component: ModalPlayerComponent;
  let fixture: ComponentFixture<ModalPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPlayerComponent]
    });
    fixture = TestBed.createComponent(ModalPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
