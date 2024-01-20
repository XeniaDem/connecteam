
import styles from "./StartPage.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import crown from "../crown.svg"
import exit from "../exit.svg"
import { Players } from "../players/Players"
import { Button } from "../../../components/button/Button"



export function StartPage() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>

        <div className={styles.exit}>
          <img src={exit} />
        </div>


        <div className={styles.crown}>
          <img src={crown} />
        </div>
        <div className={styles.photo}>

        </div>

        <div className={styles.title}>
          "Название игры"
        </div>
        <div className={styles.date}>
          19.10.2023
        </div>

        <Button text={"Начать игру"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.startButton} />












      </div>



    </div>
  )
}