import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    original_url: {
        type: String
    },
    long_url: {
        type: String
    },
    short_url: {
        type: String
    }
});

export const UrlShortener = mongoose.model('UrlShorterner', urlSchema);
