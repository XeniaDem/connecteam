
import styles from "./StartGame.module.css"
import crown from "../crown.svg"
import exit from "../exit.svg"
import photo from "./photo.svg"
import { Button } from "../../../../components/button/Button"

type Props = {
  name: string;
  date: string;
  photo?: string;
  onButtonClicked: () => void;
}

export function StartGame(props: Props) {
  return (
    <div>
      <div className={styles.container}>



        <div className={styles.crown}>
          <img src={crown} />
        </div>
        <div className={styles.photo}>
          <img src={photo} />
        </div>

        <div className={styles.title}>
          {props.name}
        </div>
        <div className={styles.date}>
          {props.date}
        </div>

        <Button text={"Начать игру"} onClick={props.onButtonClicked} className={styles.startButton} />
      </div>
    </div>
  )
}