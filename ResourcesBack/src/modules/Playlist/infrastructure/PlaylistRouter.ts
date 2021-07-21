import { Router } from 'express';

import { getPlaylist, getAllPlaylistsofUser, createPlaylist, updatePlaylist, deletePlaylist, deleteAllPlaylists } from '@playlist/infrastructure/PlaylistApiRESTController';
import { getAllPlaylistSongs, addPlaylistSong, deletePlaylistSong } from '@playlist/infrastructure/PlaylistSongApiRESTController'

const router: Router = Router();

// Routes definition
router.get('/:id', getPlaylist);
router.get('/', getAllPlaylistsofUser);
router.post('/', createPlaylist);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.delete('/', deleteAllPlaylists);

router.get('/:playlist_id/songs', getAllPlaylistSongs);
router.post('/:playlist_id/songs/:song_id', addPlaylistSong);
router.delete('/:playlist_id/songs/:song_id', deletePlaylistSong);

export default router;