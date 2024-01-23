
import { Button } from "../../../../components/button/Button"
import styles from "./QuestionAnswer.module.css"
import { Answer } from "../answer/Answer"
import { Question } from "../question/Question"
import { useState } from "react"



type Props = {
  question: string;
  answer: string;

}


export function QuestionAnswer(props: Props) {
  const [isAnswerHidden, setIsAnswerHidden] = useState(true)
  return (

    <div className={styles.container}>
      <Question text={props.question} setIsAnswerHidden={setIsAnswerHidden} isAnswerHidden={isAnswerHidden}/>
      {isAnswerHidden ? null :
        <Answer text={props.answer} /> }
    </div>

  )
}