import React, { Component } from "react";
import OptionsPanel from "../OptionsPanel";
import Board from "../Board";
import { createTiles, indexOfSelected } from "../../misc/utils";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null,
    };
  }

  startGame = (numTiles) => {
    this.setState(function (state) {
      return {
        ...state,
        playing: true,
        previousTileIndex: null,
        toBeCleared: null,
        tiles: createTiles(state.numTiles, this.handleTileClicked),
      };
    });
  };

  handleTileClicked = (id, color) => {
    this.setState((state) => {
      const tiles = state.tiles;
      const toBeCleared = state.toBeCleared;
      const selectedTileIndex = indexOfSelected(tiles, id, color);
      const previousTileIndex = state.previousTileIndex;

      if (toBeCleared !== null) {
        tiles.map((tile) => {
          return tile.id == toBeCleared[0].id
            ? [...tile, (selected = false)]
            : tile;
        });
        toBeCleared = null;
      }

      tiles[selectedTileIndex].selected = true;

      if (previousTileIndex !== null) {
        const previousTile = tiles[previousTileIndex];
        const selectedTile = tiles[selectedTileIndex];

        if (
          previousTile.id !== selectedTile.id &&
          previousTile.color == color
        ) {
          selectedTile.matched = true;
          previousTile.matched = true;
          previousTileIndex = null;
        } else {
          toBeCleared[(previousTileIndex, selectedTileIndex)];
          previousTileIndex = null;
        }
      } else {
        previousTileIndex = selectedTileIndex;
      }

      return {
        tiles,
        toBeCleared,
        previousTileIndex,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">Turbo-Matcher</header>
        <OptionsPanel
          playing={this.state.playing}
          numTiles={this.state.numTiles}
          startGame={this.startGame}
        />
        <Board
          numTiles={this.state.numTiles}
          tiles={this.state.tiles}
          startGame={this.startGame}
        />
      </div>
    );
  }
}

export default App;
