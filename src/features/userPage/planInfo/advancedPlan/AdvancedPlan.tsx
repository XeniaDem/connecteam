
import styles from "../Plan.module.css"
import tick from "../../../../app/assets/tickBig.svg"




export function AdvancedPlan() {


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.name}>
          Расширенный
        </div>

        <div className={styles.textBoxes}>
          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              Возможность создания игры
            </div>

          </div>
          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              До 5 тем с вопросами с возможностью выбора
            </div>
          </div>

          <div className={styles.textBox}>
            <div className={styles.tick}>
              <img src={tick} />
            </div>
            <div className={styles.text}>
              Возможность приглашать в одну игру до 5 игроков
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}