import { useState } from 'react';

function NewPlayer(props) {

    const [name, setName] = useState('');

    function createPlayer() {
        let nameVal = name.trim();
        if (nameVal.length === 0) {
          return;
        }
        props.handleCreatePlayer(name.trim());
        setName('');
    }

    return (
        <div className="container mb-2">
          <div className="row">
            <input className="form-control mr-1 offset-3 col-3" onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Player Name.." />
            <button className="btn btn-success col-3" onClick={() => createPlayer()}>Create Player</button>
          </div>
        </div>
    )
}

export default NewPlayer;
