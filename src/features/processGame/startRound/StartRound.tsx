
import styles from "./StartRound.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import exit from "../exit.svg"

import { Topics } from "../../startGame/topics/Topics"
import { Button } from "../../../components/button/Button"
import { Players } from "../../startGame/players/Players"

type Props = {
  package: number;
  


}

StartRound.defaultProps = { package: 3 }


export function StartRound(props: Props) {
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

        <Players/>

        <div className={styles.title}>
          Выберите тему вопросов раунда
        </div>

        <div className={styles.topics}>
          <Topics areChecked = {false}/>

        </div>


        <Button text={"Начать раунд"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.startButton} />

          












      </div>

    </div>
  )
}