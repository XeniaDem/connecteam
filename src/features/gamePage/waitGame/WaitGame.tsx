
import styles from "./WaitGame.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"



type Props = {
  name: string;
  date: string;
}

WaitGame.defaultProps = { name: "Игра", date: "19.10.2023" }

export function WaitGame(props: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.title}>
          Ожидайте начала игры <br /> "{props.name}"
        </div>
        <div className={styles.date}>
          {props.date}
        </div>

      </div>
    </div>
  )
}