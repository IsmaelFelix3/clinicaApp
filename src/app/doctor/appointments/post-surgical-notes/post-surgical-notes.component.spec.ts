import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSurgicalNotesComponent } from './post-surgical-notes.component';

describe('PostSurgicalNotesComponent', () => {
  let component: PostSurgicalNotesComponent;
  let fixture: ComponentFixture<PostSurgicalNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSurgicalNotesComponent]
    });
    fixture = TestBed.createComponent(PostSurgicalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
