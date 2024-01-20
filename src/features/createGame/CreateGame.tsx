
import { Button } from "../../components/button/Button"
import styles from "./CreateGame.module.css"
import { CopyPopup } from "./copyPopup/CopyPopup"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import icon from "./icon.svg"
import { InvitePopup } from "./invitePopup/InvitePopup"


export function CreateGame() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.icon}>
          <img src={icon} />

        </div>

        <div className={styles.title}>
          Создание игры
        </div>
        <div className={styles.subtitle}>
          Имя создателя: name
        </div>

        <div className={styles.creation}>
          <div className={styles.inputs}>
            <input className={styles.input} placeholder="Название игры" />
            <input className={styles.input} placeholder="Дата и время игры" />

          </div>
          <Button text={"Создать игру"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.createButton} />

          <Button text={"Добавить участника"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.inviteButton} />

          <Button text={"Поделиться игрой"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.inviteButton} />
        </div>








      </div>

      <InvitePopup/>

      <CopyPopup/>
    </div>
  )
}