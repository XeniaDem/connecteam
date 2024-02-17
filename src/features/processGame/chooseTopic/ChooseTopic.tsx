
import styles from "./ChooseTopic.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import exit from "../exit.svg"
import dots from "../dots.svg"
import { Players } from "../../startGame/players/Players"
import { Button } from "../../../components/button/Button"
import { TopicModel } from "../../adminPage/questionsPage/topic/Topic"
import { useEffect, useState } from "react"
import { Topic } from "../../topics/topic/Topic"


type Props = {
  isCreator: boolean;



}

ChooseTopic.defaultProps = { isCreator: true }


export function ChooseTopic(props: Props) {
  if (!props.isCreator) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.ellipse1}>
            <img src={ellipse1} />

          </div>
          <div className={styles.ellipse2}>
            <img src={ellipse2} />

          </div>
          <div className={styles.exit}>
            <img src={exit} />
          </div>

          <Players />
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

    const [fetched, setFetched] = useState(false)

    const [topics, setTopics] = useState<TopicModel[] | null>(null)


    const readTopics = (message: any) => {
      // const messageParsed = JSON.parse(message);

      const topicsNum = 5 // (messageParsed.data.length);

      const topicModels = [];
      for (let i = 0; i < topicsNum; i++) {


        const topicModel = {
          name: "Обучение", //messageParsed.data[i].name
          id: i.toString()

        }
        topicModels.push(topicModel)

      }
      setTopics(topicModels)
      setFetched(true)

    }

    const [selectedTopicId, setSelectedTopicId] = useState("");
    // var selectedTopicsIds: string[] = [];



    useEffect(() => {
      readTopics("");


    }, [fetched]);

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.ellipse1}>
            <img src={ellipse1} />

          </div>
          <div className={styles.ellipse2}>
            <img src={ellipse2} />

          </div>
          <div className={styles.exit}>
            <Button text={""} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.exitButton} />
          </div>

          <Players />

          <div className={styles.title}>
            Выберите тему вопросов раунда
          </div>

          <div className={styles.topics}>
            {topics?.map(topic => {
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
            }

            )

            }

          </div>


          <Button text={"Начать раунд"} onClick={() => alert(selectedTopicId)} className={styles.startButton} />



        </div>

      </div>
    )

  }
}