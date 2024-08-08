import styles from "./GameResults.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import playersIcon from "./players.svg"
import { Button } from "../../components/button/Button"
import { Player } from "./player/Player"
import { Result, ResultModel } from "./result/Result"
import { useEffect, useState } from "react"
import GroupsIcon from '@mui/icons-material/Groups';
import { isMobile } from "react-device-detect"
import { get, readServerError } from "../../utils/api"
import { selectId, selectToken } from "../../store/authSlice"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { TagResult } from "./tagResult/TagResult"
import { selectGame } from "../../store/gameSlice"


type Props = {

  // gameId?: string;

  onButtonClicked?: () => void;
}


export function GameResults(props: Props) {

  const token = useSelector(selectToken)
  const userId = useSelector(selectId)

  const game = useSelector(selectGame)
  const playerId = game.playerId

  const { state } = useLocation();

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [creatorId, setCreatorId] = useState("")
  const [isCreator, setIsCreator] = useState(false)

  const [results, setResults] = useState<ResultModel[] | null>(null)
  const [singleResult, setSingleResult] = useState<ResultModel | undefined>()

  const [showResults, setShowResults] = useState(true)


  const readResults = async (message: any) => {
    const messageParsed = JSON.parse(message);
    console.log("res: " + message)
   

    const results = messageParsed.results ? messageParsed.results : messageParsed.data;

    if (results == null) {
      setResults(null)
      setShowResults(false)
      return;
    }

    const resultsNum = results.length;
    console.log("num: " + resultsNum)

    const resultsModels = [];
    for (let i = 0; i < resultsNum; i++) {
      const result = results[i]

      // var response;
      // if (props.gameId)
      //   response = await get('games/' + props.gameId + '/results/' + messageParsed.data[i].user_id + '/tags', token)
      // else
      // response = await get('games/' + state.gameId + '/results/' + messageParsed.data[i].user_id + '/tags', token)
      const tags = []
      // console.log("tags: " + response.text)
      const tagsData = result.tags;
      if (tagsData) {
        for (let j = 0; j < tagsData.length; j++) {
          const tagModel = {
            id: tagsData[j].id,
            key: tagsData[j].name
          }
          tags.push(tagModel)
        }
      }
      // response = await get('users/' + messageParsed.data[i].user_id, token)
      // const userData = JSON.parse(response.text);
      // console.log("my: " + userData.id)
      // console.log("creator: " + creatorId)
      // console.log(userData.id == creatorId)
      const id = result.user_id == "00000000-0000-0000-0000-000000000000" ? result.user_temp_id : result.user_id
      const resultModel = {
        id: id,
        name: result.name,
        isCreator: result.user_id == creatorId,
        isYou: userId == "" ? id == playerId : id == userId,
        photoUrl: "",
        result: result.value,
        tags: tags

      }
      resultsModels.push(resultModel)

    }
    setResults(resultsModels)
    setSingleResult(resultsModels?.find(result => userId == "" ? result.id == playerId : result.id == userId))
  }



  const fetchResults = async () => {
    try {
      const response = await get('games/' + state.gameId + '/results', token)
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
    setIsCreator(userId == messageParsed.creator_id)
  }

  const fetchGame = async () => {
    try {
      const response = await get('games/' + state.gameId, token)
      readGame(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  useEffect(() => {
    if (state.gameId)
      fetchGame()
    else {
      setName(game.name)
      setDate(game.date)
      setCreatorId(game.creatorId)
      setIsCreator(game.creatorId == game.playerId)
    }
  }, []);

  useEffect(() => {
    if (state.gameId)
      fetchResults()
    else {
      readResults(game.results)
    }
  }, [creatorId]);



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
              {(!isMobile) ? <img src={playersIcon} /> : <GroupsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />}
            </div>
            {showResults && <div className={styles.playerList}>
              <div className={styles.subtitle}>
                Участники:
              </div>
              {results?.map(result =>
                <div>
                  <Player savedPlayer={result} />
                </div>
              )}
            </div>}
          </div>



          {showResults && <div className={styles.results}>
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
          </div>}
        </div>

        {!showResults && <div className={styles.error}>
          Результаты данной игры отсутствуют, так как она была завершена досрочно
        </div>}

        {showResults && <div>
          <div className={styles.subtitle}>
            Теги:
          </div>
          {isCreator ? (
            <div className={styles.tags}>
              {results?.map(result =>
                <div>
                  <TagResult savedResult={result} />
                </div>
              )}
            </div>
          ) : (
            singleResult && <TagResult savedResult={singleResult} />
          )}
        </div>}
        <div className={styles.close}>
          <Button text={"Закрыть"} onClick={props.onButtonClicked ? props.onButtonClicked : () => navigate("/user_page")} className={styles.closeButton} />
        </div>
      </div>
    </div>
  )
}