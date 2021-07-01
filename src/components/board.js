

export function GameBoard(props) {
  console.log(`game board with props:`,props);


  return (
    <div id="board">
      <div>
      <button onClick={() => props.board.buildBoard()}>Rebuild board</button>
      </div>
      {props.board.tiles.map((row,i) => {
        return <div key={"row_"+i} className="row">
          {row.map((tile,j) => {
            return <div key={"tile_"+i+"_"+j} className="tile">
              Type: {tile.type}
            </div>
          })}
        </div>
      })}
    </div>
  )
}
