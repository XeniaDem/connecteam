
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"



export function EmailConfirmationPopup() {
  return (
    <div>
      <div className={styles.container}>

        {/* <div className={styles.close}>
      <Button text={""} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.closeButton} />
          </div> */}


        <div className={styles.title}>
          Введите код из письма, отправленного на указанный электронный адрес.
        </div>



        <input className={styles.input} placeholder="Код из письма" />
        {/* <div className={styles.errorMessage}>
          {error}

        </div> */}



        <Button text={"Отправить"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.button} />

      </div>

    </div>
  )
}