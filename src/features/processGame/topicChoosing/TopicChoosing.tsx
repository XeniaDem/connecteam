
import styles from "./TopicChoosing.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import exit from "../exit.svg"
import dots from "./dots.svg"
import { Players } from "../../startGame/players/Players"


type Props = {
  package: number;



}

TopicChoosing.defaultProps = { package: 3 }


export function TopicChoosing(props: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.exit}>
          <img src={exit} />
        </div>

        <Players />

        <div className={styles.title}>
          Организатор игры выбирает тему
        </div>

        <div className={styles.dots}>
          <img src={dots} />
        </div>

















      </div>

    </div>
  )
}