import { useGetDimensions } from "../../../app/hooks/useGetDimensions"
import { Button } from "../../../components/button/Button"
import styles from "./KnowMore.module.css"
import at from "./at.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { isMobile } from 'react-device-detect';

export function KnowMore() {

  const width = useGetDimensions()[0]
  return (
    <div>
      <div className={styles.container}>
        {!isMobile && width > 1130 && <div className={styles.at}>
          <img src={at} />
        </div>}
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>

        <div className={styles.up}>

          <div className={styles.title}>
            Узнать подробности
          </div>

        </div>
        <div className={styles.down}>
          <div className={styles.inputs}>
            <input className={styles.input} placeholder="Ваше Имя" />
            <input className={styles.input} placeholder="Ваш Email" />
            <input className={styles.input} placeholder="+7 (999) 999-99-99" />
          </div>
          <Button text={"Отправить запрос"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.button} />
        </div>



      </div>
    </div>





  )
}