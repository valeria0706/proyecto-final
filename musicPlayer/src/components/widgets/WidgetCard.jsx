/* eslint-disable react/prop-types */
import React from "react";
import "./widgetcard.css";
import WidgetEntry from "./WidgetEntry";
import { IconContext } from "react-icons";
import {FiChevronRight} from "react-icons/fi"

export default function WidgetCard({ title, similar, featured, newRelease }) {
  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {similar
        ? similar.map((artist, index) => {
            return (
              <WidgetEntry
                title={artist?.name}
                subtitle={artist?.followers?.total + " followers"}
                image={artist?.images[2]?.url}
              />
            );
          })
        : featured
        ? featured.map((playlist, index) => {
            return (
              <WidgetEntry
                title={playlist?.name}
                subtitle={playlist?.tracks?.total + " songs"}
                image={playlist?.images[0]?.url}
              />
            );
          })
        : newRelease
        ? newRelease.map((album) => {
            return (
              <WidgetEntry
                title={album?.name}
                subtitle={album?.artists[0]?.name}
                image={album?.images[2]?.url}
              />
            );
          })
        : null}
        <div className="widget-fade">

            <div className="fade-button">
                <IconContext.Provider value={{size:"24px",color:"#c4d0e3"}}>
                <FiChevronRight />
                </IconContext.Provider>
            </div>
        </div>
    </div>
  );
}
