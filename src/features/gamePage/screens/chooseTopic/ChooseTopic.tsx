
import styles from "./ChooseTopic.module.css"
import dots from "../dots.svg"
import { Button } from "../../../../components/button/Button"
import { TopicModel } from "../../../adminPage/questionsPage/topic/Topic"
import { useEffect, useState } from "react"
import { Topic } from "../../../topic/Topic"


type Props = {
  isCreator: boolean;
  topics: string;
  onButonClicked: (selected: string) => void;
}



export function ChooseTopic(props: Props) {



  if (!props.isCreator) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.middle}>
            <div className={styles.title}>
              Организатор игры выбирает тему
            </div>
            <div className={styles.dots}>
              <img src={dots} />
            </div>
          </div>
        </div>
      </div >
    )
  }
  else {


    const [topics, setTopics] = useState<TopicModel[] | null>(null)
    const [selectedTopicId, setSelectedTopicId] = useState("");

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const readTopics = () => {
      const messageParsed = JSON.parse(props.topics);

      const topicsNum = messageParsed.length;

      const topicModels = [];
      for (let i = 0; i < topicsNum; i++) {
        const topicModel = {
          name: messageParsed[i].name,
          id: messageParsed[i].id

        }
        topicModels.push(topicModel)

      }
      setTopics(topicModels)
    }

    const getStartError = () => {
      if (selectedTopicId == "")
        return "Выберите тему раунда";
    }

    const startError = getStartError();



    useEffect(() => {
      readTopics()


    }, []);
    return (
      <div>
        <div className={styles.container}>

          <div className={styles.title}>
            Выберите тему вопросов раунда
          </div>

          <div className={styles.topics}>
            {topics && topics.map(topic => {
              const onTopicClicked = (newValue: boolean) => {
                if (!newValue) {
                  setSelectedTopicId("");
                } else {
                  setSelectedTopicId(topic.id)
                }
              }
              return (
                <div>
                  <Topic name={topic.name} withCheckBox={false}
                    selected={topic.id == selectedTopicId} onTopicClicked={onTopicClicked} />

                </div>
              )
            })}
          </div>

          {startError && formSubmitted && (<div className={styles.errorMessage}>
            {startError}
          </div>)}
          <Button text={"Начать раунд"} onClick={() => {
            setFormSubmitted(true);
            if (startError)
              return
            props.onButonClicked(selectedTopicId)
          }}
            className={styles.startButton} />
        </div>
      </div>
    )
  }
}