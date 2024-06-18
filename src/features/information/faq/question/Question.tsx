
import { Button } from "../../../../components/button/Button"
import styles from "./Question.module.css"

type Props = {
  text: string;
  isAnswerHidden: boolean;
  onTopicClicked?: (newValue: boolean) => void;


}

Question.defaultProps = {text: "Вопрос"}

export function Question(props: Props) {

  const handleChange = () => {
    props.onTopicClicked && props.onTopicClicked(!props.isAnswerHidden);


  };
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.text}>
         {props.text}
         </div>
        <Button text={props.isAnswerHidden ? "+" : "−"} onClick={handleChange} className={styles.button} />
      </div>
      
    </div>
  )
}