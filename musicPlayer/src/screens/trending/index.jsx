import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import "../library/library.css";
import { AiFillPlayCircle } from "react-icons/ai";
import "./trending.css"

export default function Trending() {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    apiClient.get("playlists/37i9dQZEVXbMDoHDwVN2tF/tracks").then((res) => {
      console.log(res.data.items);
      setTracks(res.data.items);
    });
  }, []);

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
      <p className="title-trending">Global Top 50</p>
      <div className="library-body trendding">
        {tracks?.map((track) => (
          <div
            className="playlist-card"
            key={track.track.id}
            onClick={() => playPlaylist(track.track)}
          >
            <img
              src={track?.track?.album?.images[0].url}
              className="playlist-image"
              alt="Playlist-Art"
            />

            <p className="playlist-title">{track.track.name}</p>
            {console.log(track.track.artists)}
            <p className="playlist-subtitle">
              {getArtists(track.track.artists)}
            </p>
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
