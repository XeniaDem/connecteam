
import { Button } from "../../components/button/Button";
import styles from "./PackageList.module.css"
import tick from "./tick.svg"

type Props = {
  simpleActive?: boolean;
  extendedActive?: boolean;
  wideActive?: boolean;
  dateExpiry?: string;

}

PackageList.defaultProps = { simpleActive: false, extendedActive: false, wideActive: false, dateExpiry: "01.01.2024" }


export function PackageList(props: Props) {


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>

        {props.simpleActive ? (
          <div className={styles.nameActive}>
            Простой
          </div>
        ) : (
          <div className={styles.name}>
            Простой
          </div>
        )}
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


          {props.simpleActive ? (
            <div className = {styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {props.dateExpiry}
              </div>
              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.inactive} />
          )}


        </div>




        <div className={styles.card}>

        {props.extendedActive ? (
          <div className={styles.nameActive}>
            Расширенный
          </div>
        ) : (
          <div className={styles.name}>
            Расширенный
          </div>
        )}
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
                Возможность выбора тем для конкректной игры
              </div>
            </div>
          </div>


          
          {props.extendedActive ? (
            <div className = {styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {props.dateExpiry}
              </div>
              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.inactive} />
          )}

        </div>


        <div className={styles.card}>

        {props.wideActive ? (
          <div className={styles.nameActive}>
            Широкий
          </div>
        ) : (
          <div className={styles.name}>
            Широкий
          </div>
        )}
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
                Возможность добавлять в одну игру до 7 игроков
              </div>
            </div>
            <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
                Возможность выбора тем для конкректной игры
              </div>
            </div>
          </div>


          
          {props.wideActive ? (
            <div className = {styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {props.dateExpiry}
              </div>

              <Button text={"Участники пакета"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.viewMembers} />
              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.inactive} />
          )}
        </div>


      </div>


    </div>
  )
}