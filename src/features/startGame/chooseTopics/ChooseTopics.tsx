
import styles from "./ChooseTopics.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import crown from "../crown.svg"
import exit from "../exit.svg"
import { Players } from "../players/Players"
import { Topics } from "../../topics/Topics"
import { Button } from "../../../components/button/Button"
import { InvitePopup } from "./InvitePopup/InvitePopup"
import { useEffect, useState } from "react"
import { TopicModel } from "../../adminPage/questionsPage/topic/Topic"
import { Topic } from "../../topics/topic/Topic"

type Props = {
  package: number;



}

ChooseTopics.defaultProps = { package: 3 }


export function ChooseTopics(props: Props) {

  const checkAll = () => {


  };

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

  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]> ([]);
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
          Выберите темы для игры
        </div>

        <div className={styles.topics}>


          {topics?.map(topic => {
            const onTopicClicked = (newValue: boolean) => {
              if (newValue) {
                selectedTopicsIds.push(topic.id)
                alert("1 " + selectedTopicsIds)
                alert (selectedTopicsIds.includes(topic.id))
     
              
              } else {
                alert("2 " + selectedTopicsIds)
                const index = selectedTopicsIds.indexOf(topic.id);
                if (index > -1) {
                  selectedTopicsIds.splice(index, 1);
           
                }

              }
            
            }

            return (
              <div>
                <Topic name={topic.name} withCheckBox={true}
                  selected={selectedTopicsIds.includes(topic.id)} onTopicClicked={onTopicClicked} />

              </div>
            )
          }

          )

          }

        </div>








        <Button text={"Выбрать все темы"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.allTopicsButton} />

        <Button text={"Начать игру"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.startButton} />














      </div>

    </div>
  )
}