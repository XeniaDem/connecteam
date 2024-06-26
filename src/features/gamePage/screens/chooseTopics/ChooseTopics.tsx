import styles from "./ChooseTopics.module.css"
import { Button } from "../../../../components/button/Button"
import { useEffect, useState } from "react"
import { Topic, TopicModel } from "../../components/topic/Topic"
import { selectToken } from "../../../../store/authSlice"
import { useSelector } from "react-redux"
import { get, readServerError } from "../../../../utils/api"
import { Plan } from "../../../planList/PlanList"


type Props = {
  onButonClicked: (selected?: string[]) => void;
}
export function ChooseTopics(props: Props) {

  const token = useSelector(selectToken)

  const [topics, setTopics] = useState<TopicModel[] | null>(null)
  const [topicsIds, setTopicsIds] = useState<string[]>([])


  const readTopics = (message: any) => {
    const messageParsed = JSON.parse(message);

    const topicsNum = messageParsed.data.length;

    const topicModels = [];
    const topicsIds = [];
    for (let i = 0; i < topicsNum; i++) {
      const topicModel = {
        name: messageParsed.data[i].title,
        id: messageParsed.data[i].id

      }
      topicModels.push(topicModel)
      topicsIds.push(topicModel.id)

    }
    setTopics(topicModels)
    setTopicsIds(topicsIds)

  }

  const fetchTopics = async () => {
    try {

      const response = await get('topics/', token)
      readTopics(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const [planInfo, setPlanInfo] = useState<Plan>();

  const readPlanInfo = (message: any) => {
    if (message == "") {
      return;
    }
    const messageParsed = JSON.parse(message);
    const planInfo = {
      id: messageParsed.id,
      planType: messageParsed.plan_type,
      expiryDate: messageParsed.expiry_date.substring(0, 10),
      planAccess: messageParsed.plan_access,
      status: messageParsed.status,
      isTrial: messageParsed.is_trial

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
    // if (planInfo?.planType == "basic")
    //   return 3;
    if (planInfo?.planType == "advanced")
      return 5;
    if (planInfo?.planType == "premium")
      return 10;
    return 0;
  }

  const topicLimit = getTopicLimit();





  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]>([]);

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const chooseRandomTopics = () => {
    const newSelectedTopicsIds = topicsIds

    setSelectedTopicsIds(shuffle(newSelectedTopicsIds).slice(0, topicLimit))


  }

  const [formSubmitted, setFormSubmitted] = useState(false);
  const getChooseError = () => {
    if (selectedTopicsIds.length < 3)
      return "Выберите хотя бы 3 темы";


  }

  const chooseError = getChooseError();


  useEffect(() => {

    fetchTopics();
    fetchPlan();

  }, []);

  // useEffect(() => {

  //   if (planInfo?.planType == "basic") {
  //     props.onButonClicked()
  //     return;
  //   }


  // }, [planInfo]);

  if (planInfo?.planType == "basic") {
    return (
      <div>
        <div className={styles.container}>

          <div className={styles.title}>
            Темы игры сгенерированы
          </div>
          <div className={styles.subtitle}>
            Количество тем 3
          </div>
          <div className={styles.questions}>
            <div className={styles.question1}>
              ?
            </div>
            <div className={styles.question2}>
              ?
            </div>
            <div className={styles.question3}>
              ?
            </div>
          </div>

          <Button text={"Продолжить"} onClick={() => {
            props.onButonClicked()
          }} className={styles.startButton} />

        </div>

      </div>

    )
  }

  return (
    <div>
      <div className={styles.container}>

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

        <Button text={"Выбрать случайные " + topicLimit + " тем"}
          onClick={chooseRandomTopics} className={styles.randomTopicsButton} />

        {chooseError && formSubmitted && (<div className={styles.errorMessage}>
          {chooseError}

        </div>)}

        <Button text={"Подтвердить"} onClick={() => {
          setFormSubmitted(true);
          if (chooseError)
            return;
          props.onButonClicked(selectedTopicsIds)
        }} className={styles.startButton} />

      </div>

    </div>
  )
}