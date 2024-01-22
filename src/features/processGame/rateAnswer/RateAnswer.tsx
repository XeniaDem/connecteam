
import styles from "./RateAnswer.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import exit from "../exit.svg"
import dots from "../dots.svg"
import { Players } from "../../startGame/players/Players"
import { Question } from "../question/Question"
import { Timer } from "../timer/Timer"
import { Button } from "../../../components/button/Button"
import { Rounds } from "../rounds/Rounds"


type Props = {
  isAnswering: boolean;
  isCreator: boolean;
}

RateAnswer.defaultProps = { isAnswering: false, isCreator: false }


export function RateAnswer(props: Props) {
  if (!props.isAnswering) {
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

          <div className={styles.content}>
            <div className={styles.question}>
              <Question />

              <div className={styles.stars}>
                *****
              </div>



              {props.isCreator ? (
                <Button text={"Завершить оценивание"} onClick={function (): void {
                  throw new Error("Function not implemented.")
                }} className={styles.finishButton} />


              ) : (
                <div />
              )}
            </div>

          </div>

          <Rounds/>

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
            <img src={exit} />
          </div>

          <Players />

          <div className={styles.middle}>
            <div className={styles.title}>
              Игроки оценивают ваш ответ
            </div>

            <div className={styles.dots}>
              <img src={dots} />
            </div>
          </div>


          {props.isCreator ? (
            <Button text={"Завершить оценивание"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.finishButton} />


          ) : (
            <div />
          )}



        </div>

      </div>
    )
  }

}