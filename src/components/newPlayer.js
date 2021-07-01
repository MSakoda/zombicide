import { useState } from 'react';

function NewPlayer(props) {

    const [name, setName] = useState('');

    function createPlayer() {
        props.createPlayer(name);
        setName('');
    }

    return (
        <div>
            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Player Name.." />
            <button onClick={() => createPlayer()}>Create Player</button>
        </div>
    )
}

export default NewPlayer;
