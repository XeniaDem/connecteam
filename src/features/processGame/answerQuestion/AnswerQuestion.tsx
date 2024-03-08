
import styles from "./AnswerQuestion.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
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

AnswerQuestion.defaultProps = { isAnswering: false, isCreator: true }


export function AnswerQuestion(props: Props) {
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
            <Question/>

            {props.isAnswering  || props.isCreator? (
               <Button text={"Завершить ответ"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.finishButton} />


            ) : (
              <div/>
            )}
          </div>
          <div className={styles.timer}>
            <Timer isCreator = {props.isCreator}/>
          </div>
        </div>
        <Rounds/>
      </div>
      


    </div >
  )
}