export default function Die(props) {
    return (
       
            <button className="die-button" onClick={() => props.onDieClick(props.id)} style={props.style}>
               {props.value}
            </button>

    )
}