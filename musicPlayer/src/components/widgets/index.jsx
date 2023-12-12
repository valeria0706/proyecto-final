/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  

  useEffect(() => {
    if(artistID){ apiClient
        .get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          const a = res.data.artists.slice(0, 3);
          console.log(a);
  
          setSimilar(a);
        })
        .catch((err) => {
          console.log(err);
        });
    
        apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data.playlists.items.slice(0, 3);
          console.log(a);
          setFeatured(a);
        })
        .catch((err) => {
          console.log(err);
        });
  
      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data.albums.items.slice(0, 3);
          console.log(a);
  
          setNewRelease(a);
        })
        .catch((err) => {
          console.log(err);
        });
    }
   

  
  }, [artistID]);
  return (
    <div className="widgets-body flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="Made For You" featured={featured} />

      <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  );
}
