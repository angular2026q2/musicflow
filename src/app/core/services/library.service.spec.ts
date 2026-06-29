import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Payload } from '@shared/interfaces/payload';
import { PlaylistResponse } from '@shared/interfaces/playlist.interface';
import { Track } from '@shared/interfaces/track.interface';
import { toHistoryRequest } from '@shared/utils/toHistorRequest';
import { API_CONFIG, BUILD_URL } from 'src/app/api.tokens';
import { AuthService } from './auth.service';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let service: LibraryService;
  let httpMock: HttpTestingController;

  const historyPath = 'history';
  const playlistsPath = 'playlists';
  const historyUrl = `/api/${historyPath}`;
  const playlistsUrl = `/api/${playlistsPath}`;

  const isAuthenticated = signal(false);

  const authServiceMock = {
    isAuthenticated,
  };

  const apiConfigMock = {
    baseUrl: '/api/v1',
    path: {
      history: historyPath,
      playlists: playlistsPath,
    },
  };

  const buildUrlMock = vi.fn((path: string) => `/api/${path}`);

  beforeEach(() => {
    buildUrlMock.mockClear();
    isAuthenticated.set(false);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: BUILD_URL,
          useValue: buildUrlMock,
        },
        {
          provide: API_CONFIG,
          useValue: apiConfigMock,
        },
      ],
    });

    service = TestBed.inject(LibraryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build api urls from config paths', () => {
    expect(buildUrlMock).toHaveBeenCalledWith(historyPath);
    expect(buildUrlMock).toHaveBeenCalledWith(playlistsPath);
  });

  it('should add track to history', async () => {
    const track: Track = {
      id: '1',
      name: 'Name of track',
      duration: 360,
      artist_id: '',
      artist_name: 'John Doe',
      artist_idstr: '',
      album_name: '',
      album_id: 'album-1',
      license_ccurl: '',
      position: 2,
      releasedate: '',
      album_image: '',
      audio: '',
      audiodownload: '',
      prourl: '',
      shorturl: '',
      shareurl: '',
      image: '',
      audiodownload_allowed: true,
      content_id_free: false,
    };

    const body = toHistoryRequest(track);
    const promise = service.addToHistory(track);
    const req = httpMock.expectOne(historyUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush({});

    await expect(promise).resolves.toBeUndefined();
  });

  it('should create playlist without tracks', async () => {
    const playlist = {
      name: 'Name of album',
      description: '',
    };

    const playlistResponse: PlaylistResponse = {
      ...playlist,
      user_id: 'user-id-1',
      created_at: '',
      updated_at: '',
      id: 'playlist-1',
      tracks: [],
    };

    const promise = service.createPlaylist(playlist);
    const req = httpMock.expectOne(playlistsUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(playlist);

    req.flush(playlistResponse);

    await expect(promise).resolves.toEqual(playlistResponse);
  });

  it('should update playlist', async () => {
    const playlistId = 'playlist-1';

    const payload: Payload = {
      name: 'Updated playlist',
      description: 'Updated description',
      tracks: ['track-1', 'track-2'],
    } as unknown as Payload;

    const playlistResponse: PlaylistResponse = {
      ...payload,
      id: playlistId,
    } as PlaylistResponse;

    const promise = service.updatePlaylist(playlistId, payload);

    const req = httpMock.expectOne(`${playlistsUrl}/${playlistId}`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);

    req.flush(playlistResponse);

    await expect(promise).resolves.toEqual(playlistResponse);
  });

  it('should create playlist with tracks', async () => {
    const payload = {
      name: 'Playlist with tracks',
      description: 'Description',
      tracks: ['track-1', 'track-2'],
    } as unknown as Payload;

    const createdPlaylist: PlaylistResponse = {
      id: 'playlist-1',
      name: payload.name,
      description: payload.description,
      user_id: 'user-id-1',
      created_at: '',
      updated_at: '',
      tracks: [],
    } as PlaylistResponse;

    const updatedPlaylist: PlaylistResponse = {
      id: createdPlaylist.id,
      name: createdPlaylist.name,
      description: createdPlaylist.description,
      tracks: payload.tracks,
    } as PlaylistResponse;

    const promise = service.createPlaylistWithTracks(payload);

    const createReq = httpMock.expectOne(playlistsUrl);

    expect(createReq.request.method).toBe('POST');
    expect(createReq.request.body).toEqual({
      name: payload.name,
      description: payload.description,
    });

    createReq.flush(createdPlaylist);

    let updateReq: TestRequest | undefined;

    await vi.waitFor(() => {
      updateReq = httpMock.expectOne(`${playlistsUrl}/${createdPlaylist.id}`);
    });

    expect(updateReq?.request.method).toBe('PUT');
    expect(updateReq?.request.body).toEqual({
      name: createdPlaylist.name,
      description: createdPlaylist.description,
      tracks: payload.tracks,
    });

    updateReq?.flush(updatedPlaylist);

    await expect(promise).resolves.toEqual(updatedPlaylist);
  });

  it('should delete playlist by id', async () => {
    const playlistId = 'playlist-1';

    const promise = service.deletePlaylist(playlistId);
    const req = httpMock.expectOne(`${playlistsUrl}/${playlistId}`);

    expect(req.request.method).toBe('DELETE');

    req.flush({});

    await expect(promise).resolves.toBeUndefined();
  });
});
