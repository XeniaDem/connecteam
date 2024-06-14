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


type Props = {
  gameId?: string;
  onButtonClicked?: () => void;
}


export function GameResults(props: Props) {

  const token = useSelector(selectToken)
  const userId = useSelector(selectId)
  const { state } = useLocation();

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [creatorId, setCreatorId] = useState("")
  const [isCreator, setIsCreator] = useState(false)

  const [results, setResults] = useState<ResultModel[] | null>(null)
  const [singleResult, setSingleResult] = useState<ResultModel | undefined>()


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
        var response;
        if (props.gameId)
          response = await get('games/' + props.gameId + '/results/' + messageParsed.data[i].user_id + '/tags', token)
        else
          response = await get('games/' + state.gameId + '/results/' + messageParsed.data[i].user_id + '/tags', token)
        const tags = []
        const tagsData = JSON.parse(response.text);
        if (tagsData.data) {
          for (let j = 0; j < tagsData.data.length; j++) {
            const tagModel = {
              id: tagsData.data[j].id,
              key: tagsData.data[j].name
            }
            tags.push(tagModel)
          }
        }
        response = await get('users/' + messageParsed.data[i].user_id, token)
        const userData = JSON.parse(response.text);
        const resultModel = {
          id: userData.id,
          name: userData.first_name + " " + userData.second_name,
          isCreator: userData.id == creatorId,
          isYou: userData.id == userId,
          photoUrl: "",
          result: messageParsed.data[i].value,
          tags: tags

        }
        resultsModels.push(resultModel)
      }
      catch (error: any) {
        readServerError(error.response.text)
        console.log("error:", error)
      }
    }
    setResults(resultsModels)
    setSingleResult(resultsModels?.find(result => result.id == userId))
  }



  const fetchResults = async () => {
    try {
      var response;
      if (props.gameId)
        response = await get('games/' + props.gameId + '/results', token)
      else
        response = await get('games/' + state.gameId + '/results', token)
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
      var response;
      if (props.gameId)
        response = await get('games/' + props.gameId, token)
      else
        response = await get('games/' + state.gameId, token)
      readGame(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }



  useEffect(() => {
    fetchGame()
    fetchResults()
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
              {(!isMobile) ? <img src={playersIcon} /> : <GroupsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />}
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

        <div>
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
        </div>
        <div className={styles.close}>
          <Button text={"Закрыть"} onClick={props.onButtonClicked ? props.onButtonClicked : () => navigate("/user_page")} className={styles.closeButton} />
        </div>
      </div>
    </div>
  )
}