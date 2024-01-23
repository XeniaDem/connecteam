
import { Button } from "../../../components/button/Button"
import styles from "./Faq.module.css"
import { Answer } from "./answer/Answer"
import { Question } from "./question/Question"
import { QuestionAnswer } from "./questionAnswer/QuestionAnswer"


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
          <QuestionAnswer question="Вопрос" answer="Ответ" />
          <QuestionAnswer question="Вопрос" answer="Ответ" />
          <QuestionAnswer question="Вопрос" answer="Ответ" />
          <QuestionAnswer question="Вопрос" answer="Ответ" />
          <QuestionAnswer question="Вопрос" answer="Ответ" />
        </div>
      </div>
    </div>
  )
}