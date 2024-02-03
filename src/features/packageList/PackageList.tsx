
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import styles from "./PackageList.module.css"
import tick from "./tick.svg"
import { useEffect, useState } from "react";
import { Plan } from "../profile/packageInfo/PackageInfo";

type Props = {
  // basicActive?: boolean;
  // advancedActive?: boolean;
  // premiumActive?: boolean;

  isLogged: boolean;

  planInfo?: Plan | null;


}




export function PackageList({ isLogged, planInfo }: Props) {
  const navigate = useNavigate()


  const choosePackage = () => {

    if (!isLogged) {
      navigate("/register")
    } else {
      /////tbd
    }

  }

  // const [withPackage, setWithPackage] = useState(false);

  const [basicActive, setBasicActive] = useState(false);
  const [advancedActive, setAdvancedActive] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);


  const readAccess = () => {
    if (planInfo == null) {
      setBasicActive(false);
      setAdvancedActive(false);
      setPremiumActive(false);
      return;

    }

    if (planInfo?.planType == "basic") {
      setBasicActive(true);
      setAdvancedActive(false);
      setPremiumActive(false);
      return;
    }
    if (planInfo?.planType == "advanced") {
      setBasicActive(false);
      setAdvancedActive(true);
      setPremiumActive(false);
      return;
    }
    if (planInfo?.planType == "premium") {
      setBasicActive(false);
      setAdvancedActive(false);
      setPremiumActive(true);
      return;
    }

  }

  useEffect(() => {

    readAccess()

  }, [planInfo]);


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>

          {basicActive ? (
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


          {basicActive ? (
            <div className={styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {planInfo?.expiryDate}
              </div>
              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={choosePackage} className={styles.inactive} />
          )}


        </div>




        <div className={styles.card}>

          {advancedActive ? (
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



          {advancedActive ? (
            <div className={styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {planInfo?.expiryDate}
              </div>
              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={choosePackage} className={styles.inactive} />
          )}

        </div>


        <div className={styles.card}>

          {premiumActive ? (
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



          {premiumActive ? (
            <div className={styles.buttons}>
              <div className={styles.expiry}>
                Дата истечения срока подписки {planInfo?.expiryDate}
              </div>
              {planInfo?.planAccess == "holder" ? (

                <Button text={"Участники пакета"} onClick={function (): void {
                  throw new Error("Function not implemented.")
                }} className={styles.viewMembers} />

              ) : (
                null

              )}

              <Button text={"Отказаться"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.cancel} />
            </div>

          ) : (
            <Button text={"Выбрать"} onClick={choosePackage} className={styles.inactive} />
          )}
        </div>


      </div>


    </div>
  )
}