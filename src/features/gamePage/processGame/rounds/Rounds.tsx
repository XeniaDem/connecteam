
import styles from "./Rounds.module.css"
import { Round } from "./round/Round";



type Props = {
  roundsNum: number;
  currentRound: number;


}

Rounds.defaultProps = { roundsNum: 8, currentRound: 1 }


export function Rounds(props: Props) {
  const rounds = [];

  for (let i = 1; i <= props.roundsNum; i++) {
    if (i == props.roundsNum) {
      if (i <= props.currentRound) {
        rounds.push(<Round numRound={i} started={true} last={true} />)
        continue;

      } else {
        rounds.push(<Round numRound={i} last={true} />)
        continue;
      }
    }
    if (i <= props.currentRound) {
      rounds.push(<Round numRound={i} started={true} />)
      continue;
    }
    rounds.push(<Round numRound={i} />)
  }


  return (
    <div className={styles.container}>
      {rounds}


    </div>
  )


}