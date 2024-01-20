
import { Button } from "../../../components/button/Button"
import styles from "./Faq.module.css"
import { Answer } from "./answer/Answer"
import { Question } from "./question/Question"


export function Faq() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title}>
            FAQ
          </div>
        </div>
        

        <div className={styles.questions}>
          <Question/>
          <Answer/>
          <Question/>
          <Question/>
          <Question/>
          <Question/>
        </div>
      </div>
    </div>
  )
}