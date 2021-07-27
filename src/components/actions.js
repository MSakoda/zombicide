import { useState } from 'react';
import { Weapons } from './weapon';

export function Actions(props) {

  const [moving, setMoving] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAttack, setShowAttack] = useState(false);

  const directions = [
    {
      direction: 'Up',
      move: [-1, 0]
    },
    {
      direction: 'Left',
      move: [0, -1]
    },
    {
      direction: 'Right',
      move: [0, 1]
    },
    {
      direction: 'Down',
      move: [1, 0]
    },
  ]

  function handleSelectWeapon(player, weapon){
        console.log("running handleSelectWeapon with player:",player,"and weapon",weapon);
        if (weapon.maxRange === 0) {
            console.log("proceed to attack within player square");
            props.handleAttackTile(player,weapon, data => {
                console.log("data from callback:",data);
            });
        } else {
            console.log("player may choose to attack in another nearby square");
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


          // get current tile of player
          let playerTile = props.board.getTile(player.position.row, player.position.col);
          let canAttack = player.canAttack(playerTile);
          let canSearch = player.canSearch(playerTile);

          return <div className={`player${ player.active ? ' active' : ''}`} key={'player_'+i}>
            <div>
              Player Name: {player.name}
            </div>
            <div>
              Health: {"❤".repeat(player.health)}
            </div>
            {player.active &&
              <p>Actions: {player.actions}</p>
            }
            <div>

            {props.phase === 'player' && !moving && !showInfo && !showAttack && player.active &&
                <div>
                    <div>
                      <button
                        onClick={() => setShowInfo(true)}
                        className="btn btn-sm btn-info">
                          Info
                        </button>
                    </div>

                    <div>
                      <button
                        className="m-1 btn btn-sm btn-primary"
                        onClick={() => setMoving(true)}
                        disabled={!player.active}>
                          Move
                      </button>
                      <button
                        onClick={() => props.handleSearch(player, () => {
                          console.log(`after search`);
                          if (player.actions == 0) {
                            props.handleEndTurn(player,i);
                          }
                        })}
                        className="m-1 btn btn-sm btn-primary"
                        disabled={!player.active || !canSearch}>
                          Search
                      </button>
                    </div>

                    <div>
                      <button
                        className="m-1 btn btn-sm btn-primary"
                        onClick={() => setShowAttack(true)}
                        disabled={!player.active || !canAttack}>
                          Attack
                      </button>
                      <button
                        className="m-1 btn btn-sm btn-primary"
                        onClick={() => props.handleEndTurn(player,i)}
                        disabled={!player.active}>
                          End Turn
                      </button>
                    </div>
                </div>
            }
            {showAttack && player.active &&
                <div>
                    <h5>Which weapon to attack with?</h5>
                    { player.weapons.map((weapon,i) => {
                        return <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleSelectWeapon(player,weapon)}
                            key={`weapon_${i}`}>{weapon.name}</button>
                    }) }
                    <br/>
                <button className="mt-1 btn btn-sm btn-danger">Back</button>
                </div>
            }

            {showInfo && player.active &&
              <div>
                <div>Info</div>
                { player.weapons.length > 0 &&
                    <Weapons weapons={player.weapons} />
                }
                <div></div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="btn btn-sm btn-primary">
                    Back
                </button>
              </div>
            }

            {moving && player.active &&
              <div>
                <div>Directions</div>
                {directions.map((direction => {

                  // determine if move is possible
                  let canMoveDirection = player.canMoveDirection(direction.move);
                  console.log(`canMoveDirection ${direction.direction}:`,canMoveDirection);

                  // Direction buttons
                  return <button className="btn btn-sm btn-secondary m-1" disabled={!canMoveDirection} onClick={() => props.handleMove(player, direction, () => {
                    console.log("finished moving:",player);
                    setMoving(false);
                    if (player.actions == 0) {
                      props.handleEndTurn(player,i);
                    }
                  })} key={direction.direction}>{direction.direction}</button>
                }))}
                <div>
                  <button onClick={() => setMoving(false)} className="mt-1 btn btn-sm btn-primary">Cancel Move</button>
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
