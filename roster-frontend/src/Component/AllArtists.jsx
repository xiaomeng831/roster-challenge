import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { getArtists, getArtistsDesc, deleteArtist } from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
        position:sticky;
        top:0;      
        z-index:1; 
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const AllArtists = () => {
    const [artists, setArtists] = useState([]);
    const [sort, setSort] = useState(true)
    
    useEffect(() => {
        sort?getAllArtists():getAllArtistsDesc();      
    }, [sort]);

    const deleteArtistData = async (id) => {
        await deleteArtist(id);
        sort?getAllArtists():getAllArtistsDesc();  
    }

    const getAllArtists = async () => {
        let response = await getArtists();
        setArtists(response.data);
    }

    const getAllArtistsDesc = async () => {
        let response = await getArtistsDesc();
        setArtists(response.data);
    }
    const sortByAmout = () =>{
        setSort(false)
    }
    const calculateMonths = () => {

        let endDate = new Date();
        let endMonths = endDate.getYear() * 12 + endDate.getMonth()
        
        let startDate = new Date("2006-04-01");
        let startMonths = startDate.getYear() * 12 + startDate.getMonth()      
    
        let m = Math.abs(endMonths - startMonths)
        return m
    }
    return (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>ArtistName</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Streams</TableCell>
                    <TableCell>Payout Amount</TableCell>
                    <TableCell>Payout monthly</TableCell>
                    <TableCell>Payout Status</TableCell>
                    <TableCell><Button onClick={() => sortByAmout()} color="success" variant="contained" style={{marginRight:10}}>DESC by Amount</Button></TableCell>
                    
                </THead>
            </TableHead>
            <TableBody>
                {artists.map((artist,index) => (
                    <TRow key={index}>
                        <TableCell >{artist.name}</TableCell>
                        <TableCell >{artist.rate}</TableCell>
                        <TableCell >{artist.streams}</TableCell>
                        <TableCell >{artist.payoutAmount}</TableCell>
                        <TableCell >{(artist.payoutAmount/calculateMonths()).toFixed(2)}</TableCell>
                        <TableCell >{artist.payoutStatus? "completed":"not yet"}</TableCell>
                        <TableCell >
                            <Button color="primary" variant="contained" style={{marginRight:10, zIndex:0}} component={Link} to={`/edit/${artist._id}`}>Edit</Button>
                            <Button color="secondary" variant="contained" onClick={() => deleteArtistData(artist._id)}>Delete</Button>
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
    )
}

export default AllArtists;