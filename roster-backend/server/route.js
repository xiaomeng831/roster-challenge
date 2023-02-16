import express from 'express';
import { getArtists, getArtistsDesc, addArtist, getArtistById, editArtist, deleteArtist } from '../controller/artist-controller.js';

const router = express.Router();

router.get('/', getArtists);
router.get('/desc', getArtistsDesc);
router.post('/add', addArtist);
router.get('/:id', getArtistById);
router.put('/:id', editArtist);
router.delete('/:id', deleteArtist);

export default router;