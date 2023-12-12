import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import "../library/library.css";
import { AiFillPlayCircle } from "react-icons/ai";
import "./feed.css";

export default function Feed() {
  const [filter, setfilter] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/me/top/tracks")
      .then(function (response) {
        console.log(response);
        console.log(response.data.items);
        setTracks(response.data.items);
      })
      .catch(function (error) {
        console.error("Error al obtener las playlists:", error);
      });
  }, []);

  useEffect(() => {
    if (filter == "") {
      setAlbums([]);
      setArtists([]);
      setTracks([]);
    }
    apiClient
      .get(`/search?q=${filter}&type=album%2Cartist%2Ctrack`)
      .then(function (response) {
        console.log(response.data.tracks.items);
        setAlbums(response.data.albums.items);
        setArtists(response.data.artists.items);
        setTracks(response.data.tracks.items);

        console.log(response.data.items);
      })
      .catch(function (error) {
        console.error("Error al obtener las playlists:", error);
      });
  }, [filter]);

  const handleFilter = async (e) => {
    setfilter(e);
    console.log(e);
  };

  const getArtists = (artists) => {
    console.log(artists);
    const artistsAux = [];
    artists?.forEach((artist) => {
      artistsAux.push(artist.name);
    });
    console.log(artistsAux);
    return artistsAux.join(", ");
  };

  const playPlaylist = (track) => {
    navigate("/player", { state: { track: track } });
  };
  return (
    <div className="screen-container">
      <div className="containerFilter  flex">
        <input
          type="text"
          onChange={(event) => handleFilter(event.target.value)}
          value={filter}
          placeholder="Search"
          className="inputFilter"
        />
      </div>

      <div className="library-body favoritesContainer">
       
        {/*albums.map((album) => {
          return(
            <div
            className="playlist-card"
            key={album.id}
            //onClick={() => playPlaylist(track)}
          >
            <img
              src={album?.images[0].url}
              className="playlist-image"
              alt="Playlist-Art"
            />

            <p className="playlist-title">{album.name}</p>
  
            <p className="playlist-subtitle">{getArtists(album.artists)}</p>
            <div className="playlist-fade">
              <IconContext.Provider
                value={{ size: "50px", color: " rgba(126, 79, 142,1)" }}
              >
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
          )
        })*/}
        
        {tracks?.map((track) => (
          <div
            className="playlist-card"
            key={track.id}
            onClick={() => playPlaylist(track)}
          >
            <img
              src={track?.album.images[0].url}
              className="playlist-image"
              alt="Playlist-Art"
            />

            <p className="playlist-title">{track.name}</p>
            {console.log(track.artists)}
            <p className="playlist-subtitle">{getArtists(track.artists)}</p>
            <div className="playlist-fade">
              <IconContext.Provider
                value={{ size: "50px", color: " rgba(126, 79, 142,1)" }}
              >
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
