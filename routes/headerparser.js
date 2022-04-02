import express from 'express';
import { getHeaders, getHeaderparser } from '../controllers/headerparser.js';

const router = express.Router();

router.get("/", getHeaderparser);
router.get("/api/whoami/", getHeaders);

export default router;