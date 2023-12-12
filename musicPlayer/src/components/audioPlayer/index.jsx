/* eslint-disable react/prop-types */
import ProgressCircle from "./ProgressCircle";
import { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import Controls from "./Controls";
import WaveAnimation from "./WaveAnimation";
import apiClient from "../../spotify";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
  playSong,
  player,
  isPlaying,
  setIsPlaying
}) {

  const [trackProgress, setTrackProgress] = useState(0);

  console.log("track", total[0]?.track);

  const intervalRef = useRef();


  const duration = currentTrack?.duration_ms;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  console.log(currentPercentage);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (trackProgress == currentTrack?.duration_ms - 1) {
        player.nextTrack();
        //handleNext();
      } else  {
        console.log(isPlaying)
     
          apiClient
            .get(`me/player`)
            .then((res) => {
              console.log("res player:", res.data.progress_ms);
              setTrackProgress(res.data.progress_ms);
            })
            .catch(function (error) {
              console.error("Error al obtener las player:", error);
            });
        
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
      console.log("pase por aqui",trackProgress);
      playSong(total[currentIndex]?.track, trackProgress);
    } else if (player) {
      player.togglePlay();
    }
  }, [isPlaying]);

  useEffect(() => {
    // audioRef.current.pause();
    // audioRef.current = new Audio(audioSrc);

    // setTrackProgress(audioRef.current.currentTime);
    console.log("pase por aqui primero");
     //setIsPlaying(!isPlaying)
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getProgressFormat = (ms) => {
    const segundos = Math.round(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    const formato = `${minutos}:${
      restoSegundos < 10 ? "0" : ""
    }${restoSegundos}`;
    console.log(formato);
    return formato;
  };

  const artists = [];
  currentTrack?.album?.artists?.forEach((item) => {
    artists.push(item.name);
  });
  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          imagen={
            currentTrack && currentTrack?.album?.images
              ? currentTrack?.album?.images[0]?.url
              : ""
          }
          size={300}
          color={"#c96850"}
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">
              {getProgressFormat(Math.round(trackProgress))}
            </p>
            <WaveAnimation isPlaying={isPlaying} />

            <p className="duration">
              {currentTrack?.duration_ms
                ? getProgressFormat(currentTrack?.duration_ms)
                : "0:00"}
            </p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
            player={player}
          />
        </div>
      </div>
    </div>
  );
}
