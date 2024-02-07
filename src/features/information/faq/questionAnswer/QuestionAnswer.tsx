
import { Button } from "../../../../components/button/Button"
import styles from "./QuestionAnswer.module.css"
import { Answer } from "../answer/Answer"
import { Question } from "../question/Question"
import { useState } from "react"



type Props = {
  id: string;
  question: string;
  answer: string;
  onTopicClicked: (newValue: boolean) => void;
  isAnswerHidden: boolean;

}


export function QuestionAnswer(props: Props) {
  return (

    <div className={styles.container}>
      <Question text={props.question} isAnswerHidden={props.isAnswerHidden} onTopicClicked={() => props.onTopicClicked(props.isAnswerHidden)} />
      {props.isAnswerHidden ? null :
        <Answer text={props.answer} />}
    </div>

  )
}