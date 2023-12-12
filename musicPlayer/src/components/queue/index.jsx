import "./queue.css"
export default function Queue({tracks,setCurrentIndex,setIsPlaying}) {



const getDuration = (ms) => {
  const segundos = Math.round(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const restoSegundos = segundos % 60;
  const formato = `${minutos}:${restoSegundos < 10 ? '0' : ''}${restoSegundos}`;
  console.log(formato)
  return formato
}

  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks.map((track,index) => {
            console.log(track)
            return(
              <div key={index} className="queue-item flex" onClick={()=>{
                setIsPlaying(true)
                setCurrentIndex(index)}}>
                <p className="track-name">{track?.track?.name}</p>
                <p>{getDuration(track?.track?.duration_ms)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
