export function Weapons(props) {
    const rows = props.weapons.map((weapon,i) => {
        console.log("weapon:",weapon)
        return <tr key={`weapon_${i}`}>
            <td>{weapon.name}</td>
            <td>{weapon.damage}</td>
            <td>{weapon.hit}</td>
            <td>{weapon.hits}</td>
            {weapon.minRange != weapon.maxRange &&
                <td>{weapon.minRange}-{weapon.maxRange}</td>
            }
            {weapon.minRange === weapon.maxRange &&
                <td>{weapon.minRange}</td>
            }
        </tr>
    })
    console.log(`props.weapons:`,props.weapons);
    return (
        <div className="weapons">
          <h5>Weapons</h5>
          <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Dmg</th>
                    <th>Hit</th>
                    <th>Hits</th>
                    <th>Rng</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
          </table>
        </div>
    )
}
