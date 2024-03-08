
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
import { isMobile } from 'react-device-detect';
import { useGetDimensions } from "../../../app/hooks/useGetDimensions"
import { useSelector } from "react-redux"
import { selectToken } from "../../../utils/authSlice"
import { get, readServerError } from "../../../utils/api"



type Props = {
  name: string;

  savedPlan: Plan | null;

  onChange: () => void;



}



export function PackageInfo({ name, savedPlan, onChange }: Props) {
  const token = useSelector(selectToken)

  const width = useGetDimensions()[0]
  const navigate = useNavigate()


  const [planType, setPlanType] = useState<string | undefined>()
  const [expiryDate, setExpiryDate] = useState<string | undefined>()
  const [planAccess, setPlanAccess] = useState<string | undefined>()
  const [planStatus, setPlanStatus] = useState<string | undefined>()


  const[trialApplicable, setTrialApplicable] = useState(false)


  const fetchPreviousPlans = async () => {
    try {

      const response = await get('plans/', token)
      if (JSON.parse(response.text).data == null) {
        setTrialApplicable(true)
      }

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }





  useEffect(() => {
    setPlanType(savedPlan?.planType)
    setExpiryDate(savedPlan?.expiryDate)
    setPlanAccess(savedPlan?.planAccess)
    setPlanStatus(savedPlan?.status)
    if (savedPlan == null) {
      fetchPreviousPlans()
    }
    // alert(savedPlan?.status)



  }, [savedPlan]);




  if (!(savedPlan == null)) {

    if (planType == "basic") {
      return (
        <div className={styles.container}>
          {!isMobile && width > 1110 && <div className={styles.icon}>
            <img src={icon} />
          </div>}
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            {planStatus == "active" ? "Вам доступен пакет:" : null}
            {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
            {planStatus == "expired" ? "Срок действия плана истек." : null}
          </div>
          <div className={styles.package}>
            <BasicPackage />
          </div>
          <div className={styles.footerContainer}>
            {planStatus == "active" ? (
              <div className={styles.footer}>
                Дата истечения срока подписки {expiryDate}
              </div>
            ) : (
              null
            )
            }
            {planStatus == "active" ? (
              <Button text={"Управлять пакетом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
            {planStatus == "on_confirm" ? (
              <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
            {planStatus == "expired" ? (
              <Button text={"Продлить"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
          </div>
        </div>
      )
    }
    else if (planType == "advanced") {
      return (
        <div>
          <div className={styles.container}>
            {!isMobile && width > 1110 && <div className={styles.icon}>
              <img src={icon} />
            </div>}
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? "Вам доступен пакет:" : null}
              {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
              {planStatus == "expired" ? "Срок действия плана истек." : null}
            </div>
            <div className={styles.package}>
              <AdvancedPackage />
            </div>
            <div className={styles.footerContainer}>
              {planStatus == "active" ? (
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>
              ) : (
                null
              )
              }
              {planStatus == "active" ? (
                <Button text={"Управлять пакетом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "on_confirm" ? (
                <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "expired" ? (
                <Button text={"Продлить"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }


            </div>
          </div>
        </div>
      )
    }
    else if (planType == "premium") {
      return (
        <div>
          <div className={styles.container}>
            {!isMobile && width > 1110 && <div className={styles.icon}>
              <img src={icon} />
            </div>}
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? "Вам доступен пакет:" : null}
              {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором." : null}
              {planStatus == "expired" ? "Срок действия плана истек." : null}
            </div>
            <div className={styles.package}>
              <PremiumPackage />
            </div>

            <div className={styles.footerContainer}>
              {planStatus == "active" ? (
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>
              ) : (
                null
              )
              }

              {planStatus == "active" ? (
                <Button text={"Управлять пакетом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "on_confirm" ? (
                <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "expired" ? (
                <Button text={"Продлить"} onClick={() => navigate("/user_page/profile", { state: { targetId: "package_info" } })} className={styles.button} />
              ) : (
                null
              )
              }


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
          <PackageList isLogged={true} onChange={onChange} trialApplicable = {trialApplicable}/>
        </div>


      </div>
    )


  }
}