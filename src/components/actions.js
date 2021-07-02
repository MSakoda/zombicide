export function Actions(props) {

  function handleEndTurn(player,idx) {
    console.log(`handling end turn`);
    // switch this players' active to false, and set next player's active to true
    // if current active player is last in players array, set phase to zombie phase
    if (idx === props.players.length - 1) {
      console.log(`last player in players array, go to next phase`);
    }
  }
  return (
    <div id="actions">
      <h4>Actions</h4>
      {props.players.length === 0 &&
        <div>
          Create a player
        </div>
      }
      {props.players.length > 0 &&
        props.players.map((player,i) => {
          return <div className={`player${ player.active ? ' active' : ''}`} key={'player_'+i}>
            <div>
              Player Name: {player.name}
            </div>
            <div>
            <div>
              <button disabled={!player.active}>Move</button>
              <button disabled={!player.active}>Search</button>
            </div>
            <div>
              <button disabled={!player.active}>Attack</button>
              <button onClick={() => handleEndTurn(player,i)} disabled={!player.active}>End Turn</button>
            </div>
            </div>

          </div>
        })
      }

    </div>
  )
}
