
import { Button } from "../../../../components/button/Button"
import styles from "./Question.module.css"

type Props = {
  text: string;
  setIsAnswerHidden: (newValue: boolean) => void;
  isAnswerHidden: boolean;


}

Question.defaultProps = {text: "Вопрос"}

export function Question(props: Props) {
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.text}>
         {props.text}
         </div>
        <Button text={props.isAnswerHidden ? "+" : "-"} onClick={ ()=> {
         props.setIsAnswerHidden(!props.isAnswerHidden)
        }} className={styles.button} />
      </div>
      
    </div>
  )
}