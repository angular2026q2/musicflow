import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardComponent } from './playlist-card.component';

describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', {
      id: '1',
      name: 'Test Playlist',
      description: '',
      user_id: 'user-1',
      created_at: '',
      updated_at: '',
      tracks: [],
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
