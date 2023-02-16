import AllArtists from './Component/AllArtists';
import AddArtists from './Component/AddArtists';
import EditArtist from './Component/EditArtist';
import NavBar from './Component/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<AllArtists /> } />
        <Route path="/add" element={<AddArtists />} />
        <Route path="/edit/:id" element={<EditArtist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
