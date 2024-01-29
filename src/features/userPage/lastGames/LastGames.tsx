
import { Button } from "../../../components/button/Button"
import styles from "./LastGames.module.css"


type Props = {
  id: string;
}


export function LastGames(props: Props) {
  return (
    <div>
      <div className={styles.container} id = {props.id} >
        <div className={styles.title}>
          Последние игры
        </div>
        <div className={styles.subtitle}>
          Кликните на игру, чтобы посмотреть ее состояние
        </div>
        {/* <div className={styles.filtration}>
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.filterButton} />


          <div className={styles.filterText}>
            Фильтрация по играм
          </div>




        </div> */}


        <div className={styles.gamesType}>

          <div className={styles.myGames}>
            <Button text={"Мои"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.myButton} />
          </div>
          <div className={styles.attendedGames}>


          </div>




        </div>
        <div className={styles.games}>

          <div className={styles.game}>
            <div className={styles.gameInfo}>
              <Button text={"Игра"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.gameButton} />
              <div className={styles.gameDate}>
                19.10.2023

              </div>
            </div>
            <div className={styles.gameStatus}>
              Завершена

            </div>
          </div>
          <div className={styles.divider}>


          </div>



          






        </div>

      </div>
    </div>
  )
}