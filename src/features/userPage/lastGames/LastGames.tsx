
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/Button"
import styles from "./LastGames.module.css"
import { selectToken } from "../../auth/authSlice";
import { Tab, Tabs } from "./tabs/Tabs";
import { Game } from "./game/Game";



type Props = {
  id: string;
}


export function LastGames(props: Props) {


  const token = useSelector(selectToken)




  const tabs: Tab[] = [
    {
      tabName: "Мои",
      tabContent: <div className={styles.empty}> 
      Пока нет игр 
      </div>

    },
    {
      tabName: "Участвую",
      tabContent:
        <div className={styles.games}>
          <Game game={{
            name: "Игра",
            date: "23.10.2023",
            status: "Завершена",

          }} />
          <Game game={{
            name: "Игра",
            date: "23.10.2023",
            status: "Завершена",

          }} />
          <Game game={{
            name: "Игра",
            date: "23.10.2023",
            status: "Завершена",

          }} />

        </div>

    }
  ];
  return (
    <div>
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