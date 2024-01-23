
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"



export function SuccessPopup() {
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.close}>
      <Button text={""} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.closeButton} />
          </div>


        <div className={styles.title}>
        Вы успешно зарегистрировались!
        </div>



        <Button text={"Войти"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />

      </div>

    </div>
  )
}