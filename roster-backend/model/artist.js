import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const artistSchema = mongoose.Schema({
    name: String,
    rate: Number,
    streams: Number,
    payoutAmount: Number,
    payoutStatus: Boolean
});

autoIncrement.initialize(mongoose.connection);
artistSchema.plugin(autoIncrement.plugin, 'artist');

const postArtist = mongoose.model('artist', artistSchema);

export default postArtist;