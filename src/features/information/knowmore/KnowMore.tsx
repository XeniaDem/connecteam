import { Button } from "../../../components/button/Button"
import styles from "./KnowMore.module.css"
import at from "./at.svg"

export function KnowMore() {


  return (
    <div>
      <div className={styles.container}>
      <div className={styles.up}>

        <div className={styles.title}>
          Узнать подробности
        </div>
        <div className={styles.at}>
        <img src={at} />
        </div>

      </div>
      <div className={styles.down}>

        <input className={styles.input} />
        <input className={styles.input} />
        <input className={styles.input} />
        <Button text={"Отправить запрос"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} />
      </div>



    </div>
    </div>





  )
}