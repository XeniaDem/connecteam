
import { Button } from "../../../../components/button/Button"
import styles from "./Question.module.css"

type Props = {
  text: string;




}

Question.defaultProps = {text: "Вопрос"}

export function Question(props: Props) {
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.text}>
         {props.text}
         </div>
        <Button text={"+"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />
      </div>
      
    </div>
  )
}