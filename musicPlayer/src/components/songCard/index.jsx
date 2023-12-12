/* eslint-disable react/prop-types */
import "./songCard.css";
import AlbumImage from './albumImagen';
import AlbumInfo from './albumInformacion';

export default function SongCard({album}) {
  
  return ( 
  
   <div className='songCard-body flex'>
      <AlbumImage url={album?.images[0]?.url}  />
      <AlbumInfo album={album} />
 
    </div>
    

  );
}
