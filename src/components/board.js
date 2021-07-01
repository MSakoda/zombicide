

export function GameBoard(props) {
  console.log(`game board with props:`,props);

  function handleClick(tile){
      tile.showTile();
  }

  return (
    <div id="board">
      {props.board.tiles.map((row,i) => {
        return <div key={"row_"+i} className="row">
          {row.map((tile,j) => {
            return <div onClick={() => handleClick(tile)} key={"tile_"+i+"_"+j} className={"tile " +  (tile.startingTile ? ' starting' : tile.type)}>
            <div>Type: {tile.type}</div>
              {tile.players.length > 0 &&
                <div>Players: {tile.players.length}</div>
              }
            </div>
          })}
        </div>
      })}
    </div>
  )
}
