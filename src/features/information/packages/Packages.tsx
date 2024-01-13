import { Button } from "../../../components/button/Button"
import styles from "./Packages.module.css"
import tick from "./tick.svg"
import rectangle from "./rectangle.svg"
import ellipse1 from "./ellipse1.svg"


export function Packages() {


  return (
    <div>
      <div className={styles.title}>
        Форматы участия
      </div>
      <div className={styles.subtitle}>
        Выбор из трех пакетов
      </div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.rectangle}>
          <img src={rectangle} />
        </div>
        <div className={styles.card}>
          <div className={styles.name}>
            Простой
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
                3 темы с вопросами
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
                Не более 10 вопросов на каждую тему
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
                Возможность добавлять в одну игру не более 4 игроков
              </div>
            </div>
          </div>
          <Button text={"Выбрать"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.buttonInactive} />

        </div>
        <div className={styles.card}>
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
                Возможность приглашать в одну игру до 5 игроков
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
          <Button text={"Выбрать"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.buttonInactive} />
        </div>
        <div className={styles.card}>
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
                Возможность добавления авторизованных пользователей сервиса в качестве дополнительных организаторов игр (до 3-х) человек
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
                Возможность выбора темы для конкректной игры
              </div>
            </div>
          </div>
          <Button text={"Выбрать"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.buttonInactive} />
        </div>

      </div>


    </div>
  )
}