
import { Button } from "../../../components/button/Button"
import styles from "./InvitePopup.module.css"

type Props = {
  closePopup: () => void;
}


export function InvitePopup(props: Props) {
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.close}>
      <Button text={""} onClick={props.closePopup}  className={styles.closeButton} />
          </div>


        <div className={styles.title}>
        Укажите номер телефона/эл. адрес пользователя, куда будет выслано приглашение.
        </div>



        <input className={styles.input} placeholder="Телефон/эл. адрес" />



        <Button text={"Отправить"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.sendButton} />

      </div>

    </div>
  )
}