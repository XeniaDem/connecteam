
import styles from "./AnswerQuestion.module.css"
import { Question } from "../../components/question/Question"
import { Timer } from "../../components/timer/Timer"
import { Button } from "../../../../components/button/Button"



type Props = {
  isAnswering: boolean;
  isCreator: boolean;
  nameAnswering: string;
  question: string;
  started: boolean;
  onStartButonClicked: () => void;
  onFinishButonClicked: () => void;




}



export function AnswerQuestion(props: Props) {


  return (
    <div>
      <div className={styles.container}>

        <div className={styles.content}>
          <div className={styles.question}>
            <Question text={props.question} nameAnswering={props.nameAnswering} />
            {props.isAnswering ? (
              !props.started ? <Button text={"Начать ответ"} onClick={() => { props.onStartButonClicked() }} className={styles.button} />
                :
                <Button text={"Завершить ответ"} onClick={() => { props.onFinishButonClicked() }} className={styles.button} />
            ) : (
              null
            )}
          </div>
          <div className={styles.timer}>
            <Timer isCreator={props.isCreator} onTimeOver={props.onFinishButonClicked} />
          </div>
        </div>
      </div>
    </div>
  )
}