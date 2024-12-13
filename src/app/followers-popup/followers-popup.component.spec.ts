import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersPopupComponent } from './followers-popup.component';

describe('FollowersPopupComponent', () => {
  let component: FollowersPopupComponent;
  let fixture: ComponentFixture<FollowersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FollowersPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
