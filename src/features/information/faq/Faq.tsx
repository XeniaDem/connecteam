
import { useState } from "react"
import styles from "./Faq.module.css"
import { QuestionAnswer } from "./questionAnswer/QuestionAnswer"


export function Faq() {
  const sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const sections = [];

  const [selectedTopicId, setSelectedTopicId] = useState("");
  for (let i = 0; i < 5; i++) {
    const onTopicClicked = (newValue: boolean) => {
      if (!newValue) {
        setSelectedTopicId("");
      } else {
        setSelectedTopicId(i.toString())

      }

    }
    sections.push(<QuestionAnswer id={i.toString()} question="Вопрос" answer={sampleText}
      onTopicClicked={onTopicClicked} isAnswerHidden={i.toString() != selectedTopicId} />)
  }


  return (

    <div className={styles.container} id="faq">
      <div className={styles.title}>
        FAQ
      </div>
      <div className={styles.questions}>
        {sections}
      </div>
    </div>

  )
}