import { Router } from 'express';

import { getAllFeedtSongs, likeSong } from '@feed/infrastructure/FeedApiRESTController';

const router: Router = Router();

//  Routes definition
router.get('/', getAllFeedtSongs);
router.post('/:song_id', likeSong);

export default router;