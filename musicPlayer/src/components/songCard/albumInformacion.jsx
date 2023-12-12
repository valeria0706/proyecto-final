/* eslint-disable react/prop-types */
import "./albumInfo.css";

export default function AlbumInformacion({ album }) {
  const artists = [];
  album?.artists?.forEach((artist) => {
    artists.push(artist.name);
  });
  console.log(album);
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{album?.name + " - " + artists.join(", ")}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} by ${artists.join(
          ", "
        )} with ${album?.total_tracks} track(s)`}</p>
      </div>
      <div className="album-release">
        <p>Release Date : {album?.release_date}</p>
      </div>
    </div>
  );
}
