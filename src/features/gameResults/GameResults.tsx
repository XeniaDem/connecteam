
import styles from "./GameResults.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import players from "./players.svg"
import { Button } from "../../components/button/Button"
import { Player } from "./player/Player"
import { Result } from "./result/Result"
import { DetailedResult, DetailedResultModel } from "./detailedResult/DetailedResult"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GroupsIcon from '@mui/icons-material/Groups';
import { isMobile, isTablet } from "react-device-detect"


type Props = {
  name: string;
  date: string;

  isCreator: boolean;
}

GameResults.defaultProps = { name: "Игра", date: "19.10.2023", isCreator: false}

export function GameResults(props: Props) {

  const navigate = useNavigate()


  const [detailedResults, setDetailedResults] = useState<DetailedResultModel[] | null>(null)
  const [myDetailedResult, setMyDetailedResult] = useState<DetailedResultModel | null>(null)


  const readDetailedResults = (message: any) => {
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTopics(null)
    //   return;
    // }

    const detailedResultsNum = 10; // messageParsed.data.length;


    const detailedResultsModels = [];
    for (let i = 0; i < detailedResultsNum; i++) {

      const scoresNum = 5 // (messageParsed.data[i].length);
      const scoreModels = [];
      for (let j = 0; j < scoresNum; j++) {
        const scoreModel = {
          score: 11,
          question: "Как составлять расписание?", //messageParsed.data[i].questions[j].text

        }
        scoreModels.push(scoreModel)
      }

      const detailedResultModel = {
        id: (i + 1).toString(), //messageParsed.data[i].id,
        name: "Ксения", //messageParsed.data[i].title,
        result: 50,
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

    const scoresNum = 5 // (messageParsed.data[i].length);
    const scoreModels = [];
    for (let j = 0; j < scoresNum; j++) {
      const scoreModel = {
        score: 11,
        question: "Как составлять расписание?", //messageParsed.data[i].questions[j].text

      }
      scoreModels.push(scoreModel)
    }

    const detailedResultModel = {
      id: "1", //messageParsed.data[i].id,
      name: "Ксения", //messageParsed.data[i].title,
      result: 50,
      scores: scoreModels,
      isYou: true

    }

    setMyDetailedResult(detailedResultModel)


  }


  useEffect(() => {
    if (props.isCreator)
      readDetailedResults("")
    else
      readMyDetailedResult("")



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
        {!isMobile && <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>}
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.title}>
            {props.name}
          </div>
          <div className={styles.date}>
            {props.date}
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.playersContainer}>
            <div className={styles.icon}>
              {(!isMobile) ? <img src={players} /> : <GroupsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> }
            </div>
            <div className={styles.playerList}>
              <div className={styles.subtitle}>
                Участники:
              </div>
              <Player />
              <Player isCreator={true} />
              <Player isYou={true} />
              <Player isYou={true} isCreator={true} />
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
          <Button text={"Закрыть"} onClick={() => navigate("/user_page")} className={styles.closeButton} />
        </div>
      </div>
    </div >
  )
}