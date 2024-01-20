
import styles from "./GameResults.module.css"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import players from "./players.svg"

import { Button } from "../../components/button/Button"
import { Player } from "./player/Player"
import { Result } from "./result/Result"


type Props = {
  name: string;
  date: string;

  isCreator: boolean;
}

GameResults.defaultProps = { name: "Игра", date: "19.10.2023", isCreator: false }

export function GameResults(props: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.title}>
            "{props.name}"
          </div>
          <div className={styles.date}>
            {props.date}
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.playersContainer}>
            <div className={styles.icon}>
              <img src={players} />
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
                <Result />
                <Result />
                <Result />
                <Result />
                <Result />
                <Result />
                <Result />
                <Result />
              </div>
            ) : (
              <div className={styles.singleResult}>
                40 баллов
              </div>
            )}
          </div>
        </div>
        {props.isCreator ? (
          <div className={styles.subtitle}>
            Общая сумма баллов каждого игрока:
          </div>
        ) : (
          <div className={styles.subtitle}>
            Баллы за вопросы:
          </div>

        )}





        <div className={styles.close}>
          <Button text={"Закрыть"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.closeButton} />
        </div>
      </div>
    </div >
  )
}