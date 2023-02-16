import axios from 'axios';

//const artistsUrl = 'http://localhost:8080';
const artistsUrl = 'https://roster-backend.herokuapp.com';

export const getArtists = async (id) => {
    id = id || '';
    return await axios.get(`${artistsUrl}/${id}`);
}

export const getArtistsDesc = async () => {
    return await axios.get(`${artistsUrl}/desc`);
}

export const addArtist = async (artist) => {
    return await axios.post(`${artistsUrl}/add`, artist);
}

export const deleteArtist = async (id) => {
    return await axios.delete(`${artistsUrl}/${id}`);
}

export const editArtist = async (id, artist) => {
    return await axios.put(`${artistsUrl}/${id}`, artist)
}