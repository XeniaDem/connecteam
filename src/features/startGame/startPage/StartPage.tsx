
import styles from "./StartPage.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import crown from "../crown.svg"
import exit from "../exit.svg"
import photo from "./photo.svg"
import { Button } from "../../../components/button/Button"

type Props = {
  name: string;
  date: string;
  photo?: string;
}

StartPage.defaultProps = { name: "Игра", date: "19.10.2023" }

export function StartPage(props: Props) {
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
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.exitButton} />
              </div>


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

        <Button text={"Начать игру"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.startButton} />












      </div>



    </div>
  )
}