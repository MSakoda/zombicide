

export function GameBoard(props) {
  // console.log(`game board with props:`,props);

  function handleClick(tile){
      tile.showTile();
  }

  console.log(`building board with board:`,props.board);
  return (
    <div id="board">
      <h4>Gameboard</h4>
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
            return <div onClick={() => handleClick(tile)} key={"tile_"+i+"_"+j} className={"tile " +  (tile.startingTile ? ' starting' : tile.type) + (tile.spawnTile ? ' spawn':'')}>
            <div>Type: {tile.type}</div>
              {tile.players.length > 0 &&
                // <div>Players: {tile.players.length}</div>
                <div>Players:
                {players}
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
