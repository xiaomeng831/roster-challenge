import Artist from '../model/artist.js';

// Get all artists
export const getArtists = async (request, response) => {
    console.log("hello heroku");
    try{
        const artists = await Artist.find();
        response.status(200).json(artists);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Get all artists in descending order by payout amount
export const getArtistsDesc = async (request, response) => {
    try{
        const artists = await Artist.find().sort({payoutAmount : 'desc'});
        response.status(200).json(artists);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the artist in database
export const addArtist = async (request, response) => {
    const artist = request.body;

    const payoutAmount = (request.body.rate * request.body.streams).toFixed(2);
    artist['payoutAmount'] = payoutAmount;

    const newArtist = new Artist(artist);
    try{
        await newArtist.save();
        response.status(201).json(newArtist);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// Get a artist by id
export const getArtistById = async (request, response) => {
    try{
        const artist = await Artist.findById(request.params.id);
        response.status(200).json(artist);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited artist in the database
export const editArtist = async (request, response) => {
    let artist = request.body;
    
    const payoutAmount = (request.body.rate * request.body.streams).toFixed(2);
    artist['payoutAmount'] = payoutAmount;    

    const editArtist = new Artist(artist);
    try{
        await Artist.updateOne({_id: request.params.id}, editArtist);
        response.status(201).json(editArtist);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of artist from the database
export const deleteArtist = async (request, response) => {
    try{
        await Artist.deleteOne({_id: request.params.id});
        response.status(201).json("Artist deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
