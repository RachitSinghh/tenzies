export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button
      style={styles}
      className={props.shake ? "shake" : ""}
      onClick={props.hold}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
      onAnimationEnd={props.clearShake}
    >
      {props.value}
    </button>
  );
}
