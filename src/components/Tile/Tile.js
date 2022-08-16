import React from "react";

import "./Tile.css";

const Tile = (props) => {
  let dynamicColor =
    props.selected || props.matched
      ? { key: "backgroundColor", value: props.color }
      : null;

  return <div className="Tile"></div>;
};

export default Tile;
