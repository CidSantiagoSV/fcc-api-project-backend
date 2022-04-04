import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    original_url: {
        type: String,
        required: true,
        unique: true
    },
    short_url: {
        type: Number,
        default: 0,
    }
});

export const UrlShortener = mongoose.model('UrlShorterner', urlSchema);
