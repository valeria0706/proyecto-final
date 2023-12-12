import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player({ setGlobalDevice }) {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState({
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  });
  const [device, setDevice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (location?.state?.track) {
      console.log("track enviado", location?.state?.track);
      let tracksArray = [];
      tracksArray.push({track:location?.state?.track});
      setTrack(location?.state?.track);
      setCurrentTrack(location?.state?.track);
      setTracks(tracksArray);
    } else {
      console.log("pasa por aqui ")
      if (location?.state?.id) {
        console.log(location.state.id);
        apiClient
          .get("playlists/" + location.state?.id + "/tracks")
          .then((res) => {
            setTracks(res.data.items);
            setTrack(res.data.items[0].track);
            setCurrentTrack(res.data.items[0].track);
            console.log("Updated Tracks:", res.data.items);
          });
      } else {
      //playlist por defecto
        apiClient
          .get("playlists/" + "37i9dQZF1EIVyBIq9f8DAH" + "/tracks")
          .then((res) => {
            setTracks(res.data.items);
            setTrack(res.data.items[0].track);
            setCurrentTrack(res.data.items[0].track);
            console.log("Updated Tracks:", res.data.items);
          });
      }
    }
  }, []);

  useEffect(() => {
    let tokenAccess = localStorage.getItem("token");

    setToken(tokenAccess);
    console.log("token", tokenAccess);
    //playerFetch();
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("token access", tokenAccess);
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(tokenAccess);
        },
        volume: 1,
      });

      console.log("player sdk", player);

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDevice(device_id);
        setGlobalDevice(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });

      player.addListener("player_state_changed", (state) => {
        console.log(state);
        if (!state) {
          return;
        }
        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, []);

  useEffect(() => {
    console.log("pase por el console.log() del player", currentIndex);
    console.log("current index", tracks[currentIndex]?.track?.name);
    setCurrentTrack(tracks[currentIndex]?.track);
    setTrack(tracks[currentIndex]?.track);
    //cone ste le pongo play pero en el sdk
    //getDevices();
    console.log("tracks", tracks);
    if (device) {
      console.log("voy a poner a reproducir", tracks[currentIndex]?.track);
      console.log(
        "voy a poner a reproducir",
        tracks[currentIndex]?.track.name,
        currentIndex
      );
      playSong(tracks[currentIndex]?.track);
    }
  }, [currentIndex, tracks]);

  const playerFetch = () => {
    console.log("player");
    apiClient
      .get("tracks/11dFghVXANMlKmJXsNCbNl")
      .then((res) => {
        console.log("res player:", res.data);
        setTrack(res.data);
      })
      .catch(function (error) {
        console.error("Error al obtener las player:", error);
      });
  };

  const getDevices = () => {
    console.log("player");
    apiClient
      .get("me/player/devices")
      .then((res) => {
        console.log("res player:", res.data);
      })
      .catch(function (error) {
        console.error("Error al obtener las player:", error);
      });

    player.getCurrentState().then((state) => {
      if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
      }

      var current_track = state.track_window.current_track;
      var next_track = state.track_window.next_tracks[0];

      console.log("Currently Playing", current_track);
      console.log("Playing Next", next_track);
    });
  };

  const playSong = (trackToPlay, currentMs) => {
    console.log("track", trackToPlay);
    console.log("player", device);
    apiClient
      .put(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
        context_uri: `spotify:album:${trackToPlay?.album.id}`,
        offset: { uri: trackToPlay?.uri },
        position_ms: currentMs,
      })
      .then((res) => {
        console.log("res player:", res.data);
      })
      .catch(function (error) {
        console.error("Error al obtener las player:", error);
      });
  };

  const pauseSong = () => {
    console.log("player", device);
    apiClient
      .put(`https://api.spotify.com/v1/me/player/pause?device_id=${device}`)
      .then((res) => {
        console.log("res player:", res.data);
      })
      .catch(function (error) {
        console.error("Error al obtener las player:", error);
      });
  };

  const playerWeb = () => {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={currentTrack?.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{currentTrack?.name}</div>

              <div className="now-playing__artist">
                {currentTrack?.artists[0]?.name}
              </div>
            </div>
            <div id="player"></div>
            <button
              className="btn-spotify"
              onClick={() => {
                player.previousTrack();
              }}
            >
              &lt;&lt;
            </button>
            <button
              className="btn-spotify"
              onClick={() => {
                player.togglePlay();
              }}
            >
              {is_paused ? "PLAY" : "PAUSE"}
            </button>

            <button
              className="btn-spotify"
              onClick={() => {
                player.nextTrack();
              }}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        {/*player && playerWeb()*/}{" "}
        <AudioPlayer
          currentTrack={currentTrack}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          total={tracks}
          playSong={playSong}
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />

        {/*
         <button onClick={playerFetch}>Play</button>
        <button onClick={getDevices}>devices</button>
        <button onClick={() => playSong(tracks[currentIndex]?.track)}>
          Play
        </button>
*/}

        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} setIsPlaying={setIsPlaying} />
      </div>
    </div>
  );
}
