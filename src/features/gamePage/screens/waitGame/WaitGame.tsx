
import styles from "./WaitGame.module.css"

type Props = {
  name: string;
  date: string;
}


export function WaitGame(props: Props) {
  return (
    <div>
      <div className={styles.container}>
      </div>
      <div className={styles.title}>
        Ожидайте начала игры <br /> <span className={styles.title1}> {props.name} </span>
      </div>
      <div className={styles.date}>
        {props.date}
      </div>

    </div>
  )
}