
import styles from "../Package.module.css"
import tick from "../tick.svg"

export function PremiumPackage() {


    return (
      <div>
        <div className={styles.container}>
          <div className={styles.name}>
            Широкий
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
              Возможность добавления авторизованных пользователей сервиса в качестве дополнительных организаторов игр (до 3-х) человек.
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
              10 тем с вопросами
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
              До 50 вопросов на каждую тему
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
              Возможность приглашать в одну игру до 7 игроков
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