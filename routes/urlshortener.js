import express from 'express';
import { getShortUrl, getUrlShortener, postShortUrl } from '../controllers/urlshortener.js';

const router = express.Router();

router.get("/", getUrlShortener);
router.post("/api/shorturl", postShortUrl);
router.get("/api/shorturl/:short_url", getShortUrl);

export default router;