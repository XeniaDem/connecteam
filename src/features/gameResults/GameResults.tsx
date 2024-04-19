
import styles from "./GameResults.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import playersIcon from "./players.svg"
import { Button } from "../../components/button/Button"
import { Player } from "./player/Player"
import { Result, ResultModel } from "./result/Result"
import { DetailedResult, DetailedResultModel } from "./detailedResult/DetailedResult"
import { useEffect, useState } from "react"
import GroupsIcon from '@mui/icons-material/Groups';
import { isMobile } from "react-device-detect"
import { get, readServerError } from "../../utils/api"
import { selectToken } from "../../store/authSlice"
import { useSelector } from "react-redux"


type Props = {
  gameId: string;

  onButtonClicked: () => void;
}


export function GameResults(props: Props) {

  const token = useSelector(selectToken)

  const [id, setId] = useState("")


  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [creatorId, setCreatorId] = useState("")
  const [isCreator, setIsCreator] = useState(false)





  const [detailedResults, setDetailedResults] = useState<DetailedResultModel[] | null>(null)
  const [myDetailedResult, setMyDetailedResult] = useState<DetailedResultModel | null>(null)

  const [results, setResults] = useState<ResultModel[] | null>(null)
  const [singleResult, setSingleResult] = useState<ResultModel | undefined>()


  const readDetailedResults = (message: any) => {
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTopics(null)
    //   return;
    // }

    const detailedResultsNum = 2; // messageParsed.data.length;


    const detailedResultsModels = [];
    for (let i = 0; i < detailedResultsNum; i++) {

      const scoresNum = 3 // (messageParsed.data[i].length);
      const scoreModels = [];
      for (let j = 0; j < scoresNum; j++) {
        const scoreModel = {
          score: 5,
          question: "Вопрос Х", //messageParsed.data[i].questions[j].text

        }
        scoreModels.push(scoreModel)
      }

      const detailedResultModel = {
        id: (i + 1).toString(), //messageParsed.data[i].id,
        name: (i == 0 ? "User 1": "User 2"), //messageParsed.data[i].title,
        result: 15,
        scores: scoreModels,
        isYou: false

      }
      detailedResultsModels.push(detailedResultModel)

    }
    setDetailedResults(detailedResultsModels)


  }
  const readMyDetailedResult = (message: any) => {
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTopics(null)
    //   return;
    // }

    const scoresNum = 3 // (messageParsed.data[i].length);
    const scoreModels = [];
    for (let j = 0; j < scoresNum; j++) {
      const scoreModel = {
        score: 5,
        question: "Вопрос Х", //messageParsed.data[i].questions[j].text

      }
      scoreModels.push(scoreModel)
    }

    const detailedResultModel = {
      id: "1", //messageParsed.data[i].id,
      name: "", //messageParsed.data[i].title,
      result: 15,
      scores: scoreModels,
      isYou: true

    }

    setMyDetailedResult(detailedResultModel)


  }


  const readResults = async (message: any) => {
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      setResults(null)
      return;
    }

    const resultsNum = messageParsed.data.length;

    const resultsModels = [];
    for (let i = 0; i < resultsNum; i++) {
      try {
        const response = await get('users/' + messageParsed.data[i].user_id, token)
        console.log(response.text)
        const userData = JSON.parse(response.text);
        const resultModel = {
          id: userData.id,
          name: userData.first_name + " " + userData.second_name,
          isCreator: userData.id == creatorId, 
          isYou: userData.id == id,
          photoUrl: "",
          result: messageParsed.data[i].value
  
        }
        resultsModels.push(resultModel)
  
      }
      catch (error: any) {
        readServerError(error.response.text)
        console.log("error:", error)
      }
    }
    setResults(resultsModels)
    setSingleResult(resultsModels?.find(result => result.id == id))
  }



  const fetchResults = async () => {
    try {
      const response = await get('games/results/' + props.gameId, token)
      readResults(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }


  const readGame = (message: any) => {
    const messageParsed = JSON.parse(message);
    setName(messageParsed.name)
    setDate(new Date(messageParsed.start_date).toLocaleString())
    setCreatorId(messageParsed.creator_id)
    setIsCreator(id == creatorId)


  }
  const fetchGame = async () => {
    try {
      const response = await get('games/' + props.gameId, token)
      readGame(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }

  const fetchMe = async () => {
    try {
      const response = await get('users/me', token)
      setId(JSON.parse(response.text).id)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }


  useEffect(() => {
    fetchMe()
    fetchGame()
    fetchResults()
    // if (props.isCreator)
    //   readDetailedResults("")
    // else
    //   readMyDetailedResult("")



  }, [isCreator]);



  return (
    <div>

      <div className={styles.container}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor="#55C6F7" />
            <stop offset={1} stopColor="#2AF8BA" />
          </linearGradient>
        </svg>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.title}>
            {name}
          </div>
          <div className={styles.date}>
            {date}
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.playersContainer}>
            <div className={styles.icon}>
              {(!isMobile) ? <img src={playersIcon} /> : <GroupsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> }
            </div>
            <div className={styles.playerList}>
              <div className={styles.subtitle}>
                Участники:
              </div>
              {results?.map(result =>
                  <div>
                    <Player savedPlayer={result} />
                  </div>
                )}
            </div>
          </div>

          <div className={styles.results}>
            <div className={styles.subtitle}>
              Результаты:
            </div>
            {isCreator ? (
              <div className={styles.allResults}>
                {results?.map(result =>
                  <div>
                    <Result savedResult={result} />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.singleResult}>
                {singleResult && singleResult.result + " баллов"}
              </div>
            )}
          </div>
        </div>
        {/* {props.isCreator ? (
          <div>
            <div className={styles.subtitle}>
              Общая сумма баллов каждого игрока:
            </div>
            {detailedResults?.map(detailedResult =>
              <div>
                <DetailedResult savedDetailedResult={detailedResult} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className={styles.subtitle}>
              Баллы за вопросы:
            </div>
            {myDetailedResult && <DetailedResult savedDetailedResult={myDetailedResult} />}
          </div>
        )} */}

        <div className={styles.close}>
          <Button text={"Закрыть"} onClick={props.onButtonClicked} className={styles.closeButton} />
        </div>
      </div>
    </div >
  )
}