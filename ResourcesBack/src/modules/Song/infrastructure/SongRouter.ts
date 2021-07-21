import { Router } from 'express';

import { getSong, getSongs } from '@song/infrastructure/SongApiRESTController';

const router: Router = Router();

//  Routes definition
router.get('/:id', getSong);
router.get('/', getSongs);

export default router;