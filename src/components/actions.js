export function Actions(props) {
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
            {props.phase === 'player' &&
                <div>
                    <div>
                    <button disabled={!player.active}>Move</button>
                    <button disabled={!player.active}>Search</button>
                    </div>
                    <div>
                    <button disabled={!player.active}>Attack</button>
                    <button onClick={() => props.handleEndTurn(player,i)} disabled={!player.active}>End Turn</button>
                    </div>
                </div>
            }
            </div>

          </div>
        })
      }

    </div>
  )
}
