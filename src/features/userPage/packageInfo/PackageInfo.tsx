
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
import { get } from "../../../utils/api"
import { selectToken } from "../../auth/authSlice"
import { useSelector } from "react-redux"


type Props = {
  name: string;
  // dateExpiry?: string;
  // access: string;




}



export function PackageInfo({ name }: Props) {

  const navigate = useNavigate()

  const token = useSelector(selectToken)



  const [planInfo, setPlanInfo] = useState<Plan | null>(null)

  const readPlanInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const planInfo = {
      planType: messageParsed.plan_type,
      expiryDate: messageParsed.expiry_date.substring(0, 10),
      planAccess: messageParsed.plan_access,

    }
    setPlanInfo(planInfo);

  }


  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    setPlanInfo(null)
    alert(content);

  }



  const fetchPlan = async () => {
    try {

      const response = await get('users/plan', token)
      readPlanInfo(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  useEffect(() => {

    fetchPlan()

  }, []);




  if (!(planInfo == null)) {

    if (planInfo?.planType == "basic") {
      return (
        <div className={styles.container}>
          <div className={styles.icon}>
            <img src={icon} />
          </div>
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            Вам доступен пакет:
          </div>
          <div className={styles.package}>
            <BasicPackage />
          </div>
          <div className={styles.footerContainer}>
            <div className={styles.footer}>
              Дата истечения срока подписки {planInfo.expiryDate}
            </div>

            <Button text={"Сменить пакет"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.button} />


          </div>
        </div>
      )
    }
    else if (planInfo?.planType == "advanced") {
      return (
        <div>
          <div className={styles.container}>
            <div className={styles.icon}>
              <img src={icon} />
            </div>
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              Вам доступен пакет:
            </div>
            <div className={styles.package}>
              <AdvancedPackage />
            </div>
            <div className={styles.footerContainer}>
              <div className={styles.footer}>
                Дата истечения срока подписки {planInfo.expiryDate}
              </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>
          </div>
        </div>
      )
    }
    else if (planInfo?.planType == "premium") {
      return (
        <div>
          <div className={styles.container}>
            <div className={styles.icon}>
              <img src={icon} />
            </div>
            <div className={styles.title}>
              Добро пожаловать, {name}!
            </div>
            <div className={styles.subtitle}>
              Вам доступен пакет:
            </div>
            <div className={styles.package}>
              <PremiumPackage />
            </div>

            <div className={styles.footerContainer}>
              <div className={styles.footer}>
                Дата истечения срока подписки {planInfo.expiryDate}
              </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>

          </div>
        </div>
      )
    }
  }


  else if (planInfo == null) { ////////////////////////////////////////////////////
    return (

      <div>

        <div className={styles.container}>
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            Выберите пакет:
          </div>
          <PackageList isLogged={true} />
        </div>


      </div>
    )


  }
}