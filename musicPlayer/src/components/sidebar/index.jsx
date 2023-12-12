import { useEffect, useState } from "react";
import "./sidebar.css";
import { useLocation } from "react-router-dom";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../spotify";

export default function Sidebar({ globalDevice }) {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4z-KNfGTZ6Q0hrkJewyJRIp7DgWTVZVal5w&usqp=CAU"
  );

  const location = useLocation();
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  useEffect(() => {
    // La función dentro de useEffect se ejecutará cuando cambie la ruta
    console.log("La ruta ha cambiado a:", location.pathname);

    // Puedes realizar otras acciones aquí según el cambio de ruta
    if (location.pathname !== "/player" && globalDevice) {
      console.log("player", globalDevice);
      apiClient
        .put(
          `https://api.spotify.com/v1/me/player/seek?position_ms=0&device_id=${globalDevice}`
        )
        .then((res) => {
          console.log("res player:", res.data);
        })
        .catch(function (error) {
          console.error("Error al obtener las player:", error);
        });

      apiClient
        .put(
          `https://api.spotify.com/v1/me/player/pause?device_id=${globalDevice}`
        )
        .then((res) => {
          console.log("res player:", res.data);
        })
        .catch(function (error) {
          console.error("Error al obtener las player:", error);
        });
    }

    // Asegúrate de limpiar el efecto si es necesario
  }, [location.pathname]);

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
      </div>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/";
        }}
      >
        <SidebarButton title="SignOut" icon={<FaSignOutAlt />} />
      </div>
    </div>
  );
}
