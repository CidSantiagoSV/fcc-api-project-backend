import express from 'express';
import { helloApi, emptyDate, formattedData, callHtml } from '../controllers/timestamp.js';

const router = express.Router();

router.get('/', callHtml);
router.get('/api/', emptyDate);
router.get('/api/hello', helloApi);
router.get('/api/:date?', formattedData);


export default router;