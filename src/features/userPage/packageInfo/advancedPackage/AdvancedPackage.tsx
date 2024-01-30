
import styles from "../Package.module.css"
import tick from "../tick.svg"





export function AdvancedPackage() {


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
                  5 тем с вопросами
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  До 20 вопросов на каждую тему
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Возможность добавлять в одну игру до 5 игроков
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Возможность выбора темы для конкректной игры
                </div>
              </div>

            </div>

        </div>

      </div>
    )
  


  
}