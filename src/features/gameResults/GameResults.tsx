
import styles from "./GameResults.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import playersIcon from "./players.svg"
import { Button } from "../../components/button/Button"
import { Player } from "./player/Player"
import { Result } from "./result/Result"
import { DetailedResult, DetailedResultModel } from "./detailedResult/DetailedResult"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GroupsIcon from '@mui/icons-material/Groups';
import { isMobile } from "react-device-detect"
import { PlayerModel } from "../gamePage/components/player/Player"
import { get, readServerError } from "../../utils/api"
import { selectToken } from "../../store/authSlice"
import { useSelector } from "react-redux"


type Props = {
  id: string;
  name: string;
  date: string;

  isCreator: boolean;
  onButtonClicked: () => void;
  players: PlayerModel[] | null;
}

// GameResults.defaultProps = { name: "Игра", date: "19.10.2023", isCreator: true}

export function GameResults(props: Props) {

  const navigate = useNavigate()
  const token = useSelector(selectToken)


  const [detailedResults, setDetailedResults] = useState<DetailedResultModel[] | null>(null)
  const [myDetailedResult, setMyDetailedResult] = useState<DetailedResultModel | null>(null)
  const [players, setPlayers] = useState<PlayerModel[] | null>(null)


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


  const readPlayers = (message: any) => {
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTopics(null)
    //   return;
    // }

    const playersNum = 5; // messageParsed.data.length;


    const playersModels = [];
    for (let i = 0; i < playersNum; i++) {

      const playerModel = {
        id: (i + 1).toString(),  //messageParsed.data[i].id,
        name: "Ксения",
        isCreator: false, 
        isYou: true,
        photoUrl: ""

      }
      playersModels.push(playerModel)

    }
    setPlayers(playersModels)


  }



  const fetchResults = async () => {
    try {
      const response = await get('games/results/' + props.id, token)
      console.log(response)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }

  }


  useEffect(() => {
    fetchResults()
    if (props.isCreator)
      readDetailedResults("")
    else
      readMyDetailedResult("")
    // readPlayers("")



  }, []);



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
            {props.name}
          </div>
          {/* <div className={styles.date}>
            {props.date}
          </div> */}
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
              {props.players?.map(player =>
                  <div>
                    <Player savedPlayer={player} />
                  </div>
                )}
            </div>
          </div>

          <div className={styles.results}>
            <div className={styles.subtitle}>
              Результаты:
            </div>
            {props.isCreator ? (
              <div className={styles.allResults}>
                {detailedResults?.map(result =>
                  <div>
                    <Result savedResult={result} />
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.singleResult}>
                {myDetailedResult && myDetailedResult.result + " баллов"}
              </div>
            )}
          </div>
        </div>
        {props.isCreator ? (
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
        )}

        <div className={styles.close}>
          <Button text={"Закрыть"} onClick={props.onButtonClicked} className={styles.closeButton} />
        </div>
      </div>
    </div >
  )
}