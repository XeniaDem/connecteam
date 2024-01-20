
import styles from "./ChooseTopics.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import crown from "../crown.svg"
import exit from "../exit.svg"
import { Players } from "../players/Players"
import { Topics } from "../topics/Topics"
import { Button } from "../../../components/button/Button"
import { InvitePopup } from "./InvitePopup/InvitePopup"

type Props = {
  package: number;
  


}

ChooseTopics.defaultProps = { package: 3 }


export function ChooseTopics(props: Props) {
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

        <Players/>

        <div className={styles.title}>
          Выберите темы для игры
        </div>

        <div className={styles.topics}>
          <Topics areChecked = {true}/>

        </div>








        <Button text={"Выбрать все темы"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.allTopicsButton} />

        <Button text={"Начать игру"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.startButton} />

          












      </div>

      <InvitePopup/>

    </div>
  )
}