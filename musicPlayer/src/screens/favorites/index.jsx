import { useEffect,useState } from "react";
import apiClient from "../../spotify";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import "../library/library.css"
import {AiFillPlayCircle} from 'react-icons/ai';



export default function Favorites() {
const [favorites, setFavorites] = useState([]);
const navigate = useNavigate();
   
  useEffect(() => {
    apiClient
      .get("/me/top/tracks")
      .then(function (response) {
        console.log(response);
        console.log(response.data.items);
        setFavorites(response.data.items);
      })
      .catch(function (error) {
        console.error("Error al obtener las playlists:", error);
      });
  }, []);


  const getArtists = (artists) => {
    console.log(artists)
    const artistsAux = [];
    artists?.forEach((artist) => {
      artistsAux.push(artist.name);
    });
    console.log(artistsAux);
    return artistsAux.join(", ");
  }
 
  const playPlaylist = (track) =>{

    navigate('/player', {state:{track:track}})
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {console.log(favorites)}
        {favorites?.map((track) => (
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
