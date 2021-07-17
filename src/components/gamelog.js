export function Gamelog(props) {
  let logs = <div></div>
  if (props.logs.length > 0) {
    let logs_reverse = [...props.logs].reverse();
    logs = logs_reverse.map((log,i) => {
      return <div key={`log_${i}`} className="log">
        {log}
      </div>
    })
  }
  return (
    <div id="gamelog">
      <h5>Game Log</h5>
      <div className="logContainer">
        {logs}
      </div>
    </div>
  )
}
