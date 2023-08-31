import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperControlsComponent } from './super-controls.component';

describe('SuperControlsComponent', () => {
  let component: SuperControlsComponent;
  let fixture: ComponentFixture<SuperControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperControlsComponent]
    });
    fixture = TestBed.createComponent(SuperControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
