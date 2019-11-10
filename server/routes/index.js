import express from 'express';
import user from './user';
import auth from './auth';

const router = express.Router();

router.use('/api/v1', user, auth);

export default router;
