
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/Button"
import styles from "./LastGames.module.css"
import { selectToken } from "../../../store/authSlice";
import { Tab, Tabs } from "./tabs/Tabs";
import { Game, GameModel } from "./game/Game";
import { get, readServerError } from "../../../utils/api";
import { useEffect, useState } from "react";



type Props = {
  id: string;
}


export function LastGames(props: Props) {


  const token = useSelector(selectToken)


  const [createdGames, setCreatedGames] = useState<GameModel[] | null>(null)
  const [allGames, setAllGames] = useState<GameModel[] | null>(null)


  const readGames = (message: any, created: boolean) => {
    const messageParsed = JSON.parse(message);
    if (messageParsed.data == null) {
      created ? setCreatedGames(null) : setAllGames(null)
      return;
    }


    const gamesNum = (messageParsed.data.length);

    const gamesModels = [];
    for (let i = 0; i < gamesNum; i++) {

      const gameModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].name,
        date: (new Date(messageParsed.data[i].start_date)).toLocaleString(),
        status: messageParsed.data[i].status,
        invitationCode: messageParsed.data[i].invitation_code

      }
      gamesModels.push(gameModel)

    }
    created ? setCreatedGames(gamesModels) : setAllGames(gamesModels)
  }

  const getCreatedGames = async () => { //////////////////////////
    try {
      const response = await get('games/created/0', token)
      readGames(response.text, true)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }



  }
  const getAllGames = async () => { //////////////////////////
    try {
      const response = await get('games/all/0', token)
      readGames(response.text, false)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }



  }

  const [gamesFetched, setGamesFetched] = useState(false)

  const onGamesChange = () => {
    setGamesFetched(!gamesFetched)
  }



  // useEffect(() => {
  //   getCreatedGames()
  //   getAllGames()

  // }, [gamesFetched]);


  const tabs: Tab[] = [
    {
      tabName: "Мои",

    },
    {
      tabName: "Участвую",

    }
  ];
  return (
    <div>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
      <div className={styles.container} id={props.id} >
        <div className={styles.title}>
          Последние игры
        </div>
        <div className={styles.subtitle}>
          Кликните на игру, чтобы посмотреть ее состояние
        </div>
        <Tabs tabs={tabs} />
        {/* <div className={styles.filtration}>
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.filterButton} />


          <div className={styles.filterText}>
            Фильтрация по играм
          </div>




        </div> */}


      </div>
    </div>
  )
}