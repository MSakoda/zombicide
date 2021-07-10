

export function GameBoard(props) {
  // console.log(`game board with props:`,props);

  function handleClick(tile){
      tile.showTile();
  }

  console.log(`building board with board:`,props.board);
  return (
    <div id="board">
      <h4>Gameboard</h4>
      <p style={{'lineHeight':'1em'}}>Key: <div className="legend" style={{'background':'purple'}}></div> Zombie spawn <div className="legend" style={{'background':'lightgreen'}}></div> Survivor spawn <div className="legend" style={{'background':'steelblue'}}></div> Room <div className="legend" style={{'background':'grey'}}></div> Default</p>
      {props.board.tiles.map((row,i) => {
        return <div key={"row_"+i} >
          {row.map((tile,j) => {

            let players;
            if (tile.players.length > 0) {
              players = tile.players.map((p,i) => {
                return <div key={"player_" + i}>
                  {p.name}
                </div>
              })
            }
            return <div
            onClick={() => handleClick(tile)}
            title={tile.type}
            key={"tile_"+i+"_"+j}
            className={"tile " +  (tile.startingTile ? ' starting' : tile.type)}>
              {tile.spawnTile &&
                <div>Spawn</div>
              }
              {tile.startingTile &&
                  <div>Starting</div>
              }
              {tile.startingTile && tile.type === "room" &&
                <div>Room</div>
              }
              {tile.players.length > 0 &&
                // <div>Players: {tile.players.length}</div>
                <div data-tooltip={tile.players.map(p => p.name).join(", ")} class="players">Players:
                {players.length}
                </div>
              }
              {tile.enemies.length > 0 &&
                <div>Enemies: {tile.enemies.length}</div>
              }
            </div>
          })}
        </div>
      })}
    </div>
  )
}
