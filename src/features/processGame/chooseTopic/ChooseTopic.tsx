
import styles from "./ChooseTopic.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import exit from "../exit.svg"
import dots from "../dots.svg"
import { Players } from "../../startGame/players/Players"
import { Topics } from "../../startGame/topics/Topics"
import { Button } from "../../../components/button/Button"


type Props = {
  package: number;
  isCreator: boolean;



}

ChooseTopic.defaultProps = { package: 3, isCreator: true }


export function ChooseTopic(props: Props) {
  if (!props.isCreator) {
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
          <div className={styles.middle}>
            <div className={styles.title}>
              Организатор игры выбирает тему
            </div>

            <div className={styles.dots}>
              <img src={dots} />
            </div>

          </div>
        </div>

      </div >
    )
  }
  else {
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
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.exitButton} />
        </div>

          <Players />

          <div className={styles.title}>
            Выберите тему вопросов раунда
          </div>

          <div className={styles.topics}>
            <Topics withCheckBox={false} />

          </div>


          <Button text={"Начать раунд"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.startButton} />



        </div>

      </div>
    )

  }
}