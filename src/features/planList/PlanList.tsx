
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import styles from "./PlanList.module.css"
import tick from "../../app/assets/tickSmall.svg"
import { useEffect, useState } from "react";
import { ChoosePlanPopup } from "./choosePlanPopup/ChoosePlanPopup";
import disableScroll from 'disable-scroll';
import { PlanInfo } from "../profile/planInfo/PlanInfo";

export type Plan = {
  id: string;
  planType: string;
  expiryDate: string;
  planAccess: string;
  status: string;
  invitationCode?: string;
  isTrial: boolean;
  holderId?: string;
}

type Props = {
  isLogged: boolean;
  trialApplicable?: boolean;
  planInfo?: Plan | null;
  onChange?: () => void;
}


export function PlanList({ isLogged, planInfo, trialApplicable, onChange }: Props) {
  const navigate = useNavigate()

  const [choosePlanOpen, setChoosePlanOpen] = useState(false)

  const openChoosePlanPopup = () => {
    disableScroll.on()
    setChoosePlanOpen(true)
  }
  const closeChoosePlanPopup = () => {
    disableScroll.off()
    setChoosePlanOpen(false)
    setNewPlan("")
    onChange && onChange()
  }


  const [newPlan, setNewPlan] = useState("");


  const [buyingTrial, setBuyingTrial] = useState(false)

  const choosePlan = (type: string) => {
    if (!isLogged) {
      navigate("/auth/register")
    } else {
      setNewPlan(type)
      if (type == "basic" && trialApplicable) {
        setBuyingTrial(true)
      }
      openChoosePlanPopup()
    }

  }

  const showPlanUsers = () => {
    navigate("/user_page/plan_users")
  }


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
              {planInfo?.isTrial ?
                <div className={styles.subtitle}>
                  У вас оформлен пробный доступ
                </div>
                :
                null
              }
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
                Возможность приглашать в одну игру не более 4 игроков
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
                </div>
              ) : (
                null
              )}
            </div>

          ) : (
            <div className={styles.down}>
              <div className={styles.offer}>
                {isLogged && !trialApplicable ? null : "Попробуйте бесплатный доступ на 14 дней!"}
              </div>
              {!advancedActive && !premiumActive && <Button text={"Выбрать"} onClick={() => choosePlan("basic")} className={isLogged ? styles.inactive : styles.active} />}
            </div>
          )}
        </div>


        <div className={styles.card}>
          {advancedActive ? (
            <div className={styles.up}>
              <div className={styles.nameActive}>
                Расширенный
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

          {advancedActive ? (
            <div className={styles.down}>
              {planInfo?.status == "active" ? (
                <div>
                  <div className={styles.expiry}>
                    Дата истечения срока подписки {planInfo?.expiryDate}
                  </div>
                </div>
              ) : (
                null
              )}
            </div>

          ) : (
            <div>
              {!premiumActive && <Button text={"Выбрать"} onClick={() => choosePlan("advanced")} className={styles.inactive} />}
            </div>
          )}
        </div>

        <div className={styles.card}>
          {premiumActive ? (
            <div className={styles.up}>
              <div className={styles.nameActive}>
                Широкий
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
                До 10 тем с вопросами с возможностью выбора
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
          </div>

          {premiumActive ? (
            <div className={styles.down}>
              {planInfo?.status == "active" ? (
                <div>
                  <div className={styles.expiry}>
                    Дата истечения срока подписки {planInfo?.expiryDate}
                  </div>
                  <div className={styles.down}>
                    {/* <Button text={"Продлить"} onClick={() => null} className={styles.viewMembers} /> */}

                    {planInfo?.planAccess == "holder" ? <Button text={"Участники плана"} onClick={showPlanUsers} className={styles.viewMembers} /> : null}
                  </div>
                </div>
              ) : (
                null
              )}
            </div>
          ) : (
            <div>
              <Button text={"Выбрать"} onClick={() => choosePlan("premium")} className={styles.inactive} />
            </div>
          )}
        </div>
      </div>
      {
        choosePlanOpen ? <ChoosePlanPopup newPlanType={newPlan} currentPlan={planInfo}
          buyingTrial={buyingTrial} closePopup={closeChoosePlanPopup}
          onChange={onChange != null ? onChange : () => null} /> : null
      }
    </div >
  )
}