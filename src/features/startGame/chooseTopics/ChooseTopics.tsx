
import styles from "./ChooseTopics.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import crown from "../crown.svg"
import exit from "../exit.svg"
import { Players } from "../players/Players"
import { Button } from "../../../components/button/Button"
import { InvitePopup } from "./InvitePopup/InvitePopup"
import { useEffect, useState } from "react"
import { TopicModel } from "../../adminPage/questionsPage/topic/Topic"
import { Topic } from "../../topics/topic/Topic"
import { Plan } from "../../profile/packageInfo/PackageInfo"
import { selectToken } from "../../auth/authSlice"
import { useSelector } from "react-redux"
import { get } from "../../../utils/api"
import { Shuffle } from "@mui/icons-material"



export function ChooseTopics() {


  const token = useSelector(selectToken)



  const [topics, setTopics] = useState<TopicModel[] | null>(null)


  const readTopics = (message: any) => {
    // const messageParsed = JSON.parse(message);

    const topicsNum = 13 // (messageParsed.data.length);

    const topicModels = [];
    for (let i = 0; i < topicsNum; i++) {


      const topicModel = {
        name: "Обучение", //messageParsed.data[i].name
        id: i.toString()

      }
      topicModels.push(topicModel)

    }
    setTopics(topicModels)

  }


  const [planInfo, setPlanInfo] = useState<Plan>();

  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message
    alert(content);

  }

  const readPlanInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const planInfo = {
      planType: messageParsed.plan_type,
      expiryDate: messageParsed.expiry_date.substring(0, 10),
      planAccess: messageParsed.plan_access,
      planConfirmed: messageParsed.confirmed ////////////

    }
    setPlanInfo(planInfo);

  }


  const fetchPlan = async () => {
    try {

      const response = await get('plans/current', token)
      readPlanInfo(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const getTopicLimit = () => {
    if (planInfo?.planType == "basic")
      return 3;
    if (planInfo?.planType == "advanced")
      return 5;
    if (planInfo?.planType == "premium")
      return 10;
    return 0;
  }

  const topicLimit = getTopicLimit();


  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]>([]);
  // var selectedTopicsIds: string[] = [];

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const chooseAllTopics = () => {
    const newSelectedTopicsIds = [...Array(topics?.length).keys()].map(String)

    setSelectedTopicsIds(shuffle(newSelectedTopicsIds).slice(0, topicLimit))


  }


  useEffect(() => {
    readTopics("");
    fetchPlan();


  }, []);


  // console.log(selectedTopicsIds)
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
        <div className={styles.subtitle}>
          Доступно тем {topicLimit - selectedTopicsIds.length} / {topicLimit}
        </div>

        <div className={styles.topics}>


          {topics?.map(topic => {
            const onTopicClicked = (newValue: boolean) => {
              if (newValue) {
                const newSelectedTopicsIds = [...selectedTopicsIds, topic.id]
                setSelectedTopicsIds(newSelectedTopicsIds)




              } else {

                const newSelectedTopicsIds = [...selectedTopicsIds].filter(topicId => topicId != topic.id)
                setSelectedTopicsIds(newSelectedTopicsIds)


              }

            }

            return (
              <div>
                <Topic name={topic.name} withCheckBox={true}
                  selected={selectedTopicsIds.includes(topic.id)} onTopicClicked={onTopicClicked}
                  inactive={!selectedTopicsIds.includes(topic.id) && (topicLimit - selectedTopicsIds.length <= 0)} />

              </div>
            )
          }

          )

          }

        </div>








        <Button text={"Выбрать случайные " + topicLimit + (topicLimit == 3 ? " темы" : " тем" )} 
        onClick={chooseAllTopics} className={styles.allTopicsButton} />

        <Button text={"Начать игру"} onClick={() => alert(selectedTopicsIds)} className={styles.startButton} />














      </div>

    </div>
  )
}