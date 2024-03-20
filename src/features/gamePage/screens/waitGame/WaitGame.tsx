
import styles from "./WaitGame.module.css"

type Props = {
  name: string;
  date: string;
}

WaitGame.defaultProps = { name: "Игра", date: "19.10.2023" }

export function WaitGame(props: Props) {
  return (
    <div>
      <div className={styles.container}>
      </div>
      <div className={styles.title}>
        Ожидайте начала игры <br /> "{props.name}"
      </div>
      <div className={styles.date}>
        {props.date}
      </div>

    </div>
  )
}