
import styles from "./Round.module.css"






type Props = {
  numRound: number;
  started: boolean;
  last: boolean;


}


export function Round(props: Props) {
  if (props.started) {
    return (
      <div className={styles.container}>
        <div className={styles.started}>
          {props.numRound}
        </div>
        {!props.last ? (
          <div className={styles.dividerStarted} />
        ) : (
          null
        )}
      </div>
    )
  }
  else {
    return (
      <div className={styles.container}>
        <div className={styles.notStarted}>
          {props.numRound}
        </div>
        {!props.last ? (
          <div className={styles.dividerNotStarted} />
        ) : (
          null
        )}
      </div>
    )
  }
}