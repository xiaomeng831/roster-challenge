import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Checkbox, Button, styled, Typography } from '@mui/material';
import { addArtist } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    rate: '',
    streams: '',
    payoutStatus: false
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddArtists = () => {
    const [artist, setArtist] = useState(initialValue);
    const { name, rate, streams, payoutStatus } = artist;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setArtist({...artist, [e.target.name]: e.target.value, payoutStatus:e.target.checked})
    }

    const addArtistDetails = async() => {
        await addArtist(artist);
        navigate('/');
    }

    return (
        <Container>
            <Typography variant="h4">Add Artist</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">rate</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='rate' value={rate} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">streams</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='streams' value={streams} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">PayoutStatus</InputLabel>
                <Checkbox onChange={(e) => onValueChange(e)} checked={payoutStatus} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addArtistDetails()}>Add Artist</Button>
            </FormControl>
        </Container>
    )
}

export default AddArtists;