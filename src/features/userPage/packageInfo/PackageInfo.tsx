
import styles from "./PackageInfo.module.css"
import icon from "./icon.svg"
import { PackageList } from "../../packageList/PackageList"
import { BasicPackage } from "./basicPackage/BasicPackage"
import { AdvancedPackage } from "./advancedPackage/AdvancedPackage"
import { PremiumPackage } from "./premiumPackage/PremiumPackage"
import { Button } from "../../../components/button/Button"
import { Plan } from "../../profile/packageInfo/PackageInfo"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { selectToken } from "../../auth/authSlice"
import { useSelector } from "react-redux"
import { useIsMobile } from "../../../app/hooks/useIsMobile"



type Props = {
  name: string;

  savedPlan: Plan | null;

  onChange: () => void;



}



export function PackageInfo({ name, savedPlan, onChange }: Props) {

  const isMobile = useIsMobile()
  const navigate = useNavigate()


  const [planType, setPlanType] = useState<string | undefined>()
  const [expiryDate, setExpiryDate] = useState<string | undefined>()
  const [planAccess, setPlanAccess] = useState<string | undefined>()
  const [planConfirmed, setPlanConfirmed] = useState<boolean | undefined>()





  useEffect(() => {
    setPlanType(savedPlan?.planType)
    setExpiryDate(savedPlan?.expiryDate)
    setPlanAccess(savedPlan?.planAccess)
    setPlanConfirmed(savedPlan?.planConfirmed)



  }, [savedPlan]);




  if (!(savedPlan == null)) {

    if (planType == "basic") {
      return (
        <div className={styles.container}>
          {!isMobile && <div className={styles.icon}>
            <img src={icon} />
          </div>}
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            {planConfirmed ? "Вам доступен пакет:" : "Ваша заявка находится на рассмотрении администратором."}
          </div>
          <div className={styles.package}>
            <BasicPackage />
          </div>
          <div className={styles.footerContainer}>
            {planConfirmed ? (
              <div className={styles.footer}>
                Дата истечения срока подписки {expiryDate}
              </div>
            ) : (
              null
            )
            }

            <Button text={planConfirmed ? "Управлять пакетом" : "Изменить заявку"}
              onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />


          </div>
        </div>
      )
    }
    else if (planType == "advanced") {
      return (
        <div>
          <div className={styles.container}>
          {!isMobile && <div className={styles.icon}>
            <img src={icon} />
          </div>}
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              {planConfirmed ? "Вам доступен пакет:" : "Ваша заявка находится на рассмотрении администратором."}
            </div>
            <div className={styles.package}>
              <AdvancedPackage />
            </div>
            <div className={styles.footerContainer}>
              {planConfirmed ? (
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>
              ) : (
                null
              )
              }
              <Button text={planConfirmed ? "Управлять пакетом" : "Изменить заявку"}
                onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />


            </div>
          </div>
        </div>
      )
    }
    else if (planType == "premium") {
      return (
        <div>
          <div className={styles.container}>
          {!isMobile && <div className={styles.icon}>
            <img src={icon} />
          </div>}
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              {planConfirmed ? "Вам доступен пакет:" : "Ваша заявка находится на рассмотрении администратором."}
            </div>
            <div className={styles.package}>
              <PremiumPackage />
            </div>

            <div className={styles.footerContainer}>
              {planConfirmed ? (
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>
              ) : (
                null
              )
              }

              <Button text={planConfirmed ? "Управлять пакетом" : "Изменить заявку"}
                onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />


            </div>

          </div>
        </div>
      )
    }
  }


  else if (savedPlan == null) { ////////////////////////////////////////////////////
    return (

      <div>

        <div className={styles.container}>
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            Выберите пакет:
          </div>
          <PackageList isLogged={true} onChange={onChange}/>
        </div>


      </div>
    )


  }
}