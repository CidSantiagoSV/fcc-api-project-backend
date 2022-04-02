import express from 'express';
import { postShortUrl, getUrlShortener } from '../controllers/urlshortener.js';

const router = express.Router();

router.get("/", getUrlShortener);
router.post("/api/shorturl", postShortUrl);

export default router;