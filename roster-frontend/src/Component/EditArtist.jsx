import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Checkbox, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getArtists, editArtist } from '../Service/api';

const initialValue = {
    name: '',
    rate: 0.00,
    streams: 0,
    payoutStatus:false
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditArtist = () => {
    const [artist, setArtist] = useState(initialValue);
    const { name, rate, streams, payoutStatus } = artist;
    const { id } = useParams();
    
    let navigate = useNavigate();

    // console.log(artist)

    useEffect(() => {

        const loadArtistDetails = async() => {
            const response = await getArtists(id);
            setArtist(response.data);
        }

        loadArtistDetails();
    }, [id]);

    // const loadArtistDetails = async() => {
    //     const response = await getArtists(id);
    //     setArtist(response.data);
    // }

    const editArtistDetails = async() => {
        // const response = await editArtist(id, artist);
        await editArtist(id, artist);
        navigate('/');
    }

    const onValueChange = (e) => {
        setArtist({...artist,[e.target.name]: e.target.value, payoutStatus:e.target.checked})
    }

    return (
        <Container injectfirst="true">
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">rate</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='rate' value={rate} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">streams</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='streams' value={streams} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">PayoutStatus</InputLabel>
                <Checkbox onChange={(e) => onValueChange(e)} checked={payoutStatus} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editArtistDetails()}>Edit Artist</Button>
            </FormControl>
        </Container>
    )
}

export default EditArtist;