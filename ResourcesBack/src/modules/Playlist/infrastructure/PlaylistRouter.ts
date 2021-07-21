import { Router } from 'express';

import { getPlaylist, getAllPlaylistsofUser, createPlaylist, updatePlaylist, deletePlaylist, deleteAllPlaylists } from '@playlist/infrastructure/PlaylistApiRESTController';
import { getAllPlaylistSongs, addPlaylistSong, deletePlaylistSong } from '@playlist/infrastructure/PlaylistSongApiRESTController'
import { Authenticator } from './AuthMiddleware';

const router: Router = Router();

//  Routes definition
router.get('/:id', Authenticator, getPlaylist);
router.get('/', Authenticator, getAllPlaylistsofUser);
router.post('/', Authenticator, createPlaylist);
router.put('/:id', Authenticator, updatePlaylist);
router.delete('/:id', Authenticator, deletePlaylist);
router.delete('/', Authenticator, deleteAllPlaylists);

router.get('/:playlist_id/songs', Authenticator, getAllPlaylistSongs);
router.post('/:playlist_id/songs/:song_id', Authenticator, addPlaylistSong);
router.delete('/:playlist_id/songs/:song_id', Authenticator, deletePlaylistSong);

export default router;