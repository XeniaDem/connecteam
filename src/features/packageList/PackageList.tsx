
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import styles from "./PackageList.module.css"
import tick from "../../app/assets/tickSmall.svg"
import { useEffect, useState } from "react";
import { Plan } from "../profile/packageInfo/PackageInfo";
import { ChoosePackagePopup } from "./choosePackagePopup/ChoosePackagePopup";
import disableScroll from 'disable-scroll';

type Props = {

  isLogged: boolean;
  planInfo?: Plan | null;
  onChange?: () => void;
}


export function PackageList({ isLogged, planInfo, onChange }: Props) {
  // const isMobile = useIsMobile()
  const navigate = useNavigate()


  const [choosePackageOpen, setChoosePackageOpen] = useState(false)

  const openChoosePackagePopup = () => {
    disableScroll.on()
    setChoosePackageOpen(true)


  }
  const closeChoosePackagePopup = () => {
    disableScroll.off()
    setChoosePackageOpen(false)
    setNewPlan("")
    onChange && onChange()



  }


  const [newPlan, setNewPlan] = useState<string | undefined>();

  const choosePackage = (type?: string) => {

    if (!isLogged) {
      navigate("/auth/register")
    } else {
      setNewPlan(type)
      openChoosePackagePopup()
    }

  }
  const showPlanUsers = () => {

    navigate("/user_page/plan_users")
  }

  // const [withPackage, setWithPackage] = useState(false);

  const [basicActive, setBasicActive] = useState(false);
  const [advancedActive, setAdvancedActive] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);


  const readAccess = () => {
    if (planInfo == null || !isLogged) {
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
             <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor="#55C6F7" />
            <stop offset={1} stopColor="#2AF8BA" />
          </linearGradient>
        </svg>
      <div className={styles.container}>
        <div className={isLogged ? styles.card : styles.highlighted}>

          {basicActive ? (
            <div className={styles.up}>
              <div className={styles.nameActive}>
                Простой
              </div>
              <div className={styles.subtitle}>
                {planInfo && planInfo.status == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
              </div>
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
            <div className={styles.down}>

              {planInfo?.status == "active" ? (
                <div>
                  <div className={styles.expiry}>
                    Дата истечения срока подписки {planInfo?.expiryDate}
                  </div>
                  {/* <div className={styles.down}>

                    <Button text={"Продлить"} onClick={() => null} className={styles.viewMembers} />
                  </div> */}
                </div>
              ) : (
                null
              )}
            </div>

          ) : (
            <div className={styles.down}>
              <div className={styles.offer}>
                {isLogged ? "" : "Попробуйте бесплатный доступ на 14 дней!"}
              </div>
              <Button text={"Выбрать"} onClick={() => choosePackage("basic")} className={isLogged ? styles.inactive : styles.active} />
            </div>
          )}


        </div>




        <div className={styles.card}>
          {advancedActive ? (
            <div className={styles.up}>
              <div className={styles.nameActive}>
                Расширенный
              </div>
              <div className={styles.subtitle}>
                {planInfo && planInfo.status == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
              </div>
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
            {/* <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
                Возможность выбора тем для конкректной игры
              </div>
            </div> */}
          </div>



          {advancedActive ? (
            <div className={styles.down}>

              {planInfo?.status == "active" ? (
                <div>
                  <div className={styles.expiry}>
                    Дата истечения срока подписки {planInfo?.expiryDate}
                  </div>
                  {/* <div className={styles.down}>

                    <Button text={"Продлить"} onClick={() => null} className={styles.viewMembers} />
                  </div> */}
                </div>
              ) : (
               null
              )}
            </div>

          ) : (
            <div>
              <Button text={"Выбрать"} onClick={() => choosePackage("advanced")} className={styles.inactive} />

            </div>

          )}

        </div>


        <div className={styles.card}>

          {premiumActive ? (
            <div className={styles.up}>
              <div className={styles.nameActive}>
                Широкий
              </div>
              <div className={styles.subtitle}>
                {planInfo && planInfo.status == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
              </div>
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
            {/* <div className={styles.textBox}>
              <div className={styles.tick}>
                <img src={tick} />
              </div>
              <div className={styles.text}>
                Возможность выбора тем для конкректной игры
              </div>
            </div> */}
          </div>



          {premiumActive ? (
            <div className={styles.down}>
              {planInfo?.status == "active" ? (
                <div >

                  <div className={styles.expiry}>
                    Дата истечения срока подписки {planInfo?.expiryDate}
                  </div>
                  <div className={styles.down}>
                    {/* <Button text={"Продлить"} onClick={() => null} className={styles.viewMembers} /> */}

                    {planInfo?.planAccess == "holder" ? <Button text={"Участники пакета"} onClick={showPlanUsers} className={styles.viewMembers} /> : null}
                  </div>
                </div>
              ) : (
               null
              )}


            </div>

          ) : (
            <div>
              <Button text={"Выбрать"} onClick={() => choosePackage("premium")} className={styles.inactive} />
            </div>
          )}
        </div>


      </div>
      {
        choosePackageOpen ? <ChoosePackagePopup planType={newPlan} closePopup={closeChoosePackagePopup}
          onChange={onChange != null ? onChange : () => null} /> : null
      }

    </div >
  )
}