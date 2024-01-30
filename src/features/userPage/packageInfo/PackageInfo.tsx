
import styles from "./PackageInfo.module.css"
import icon from "./icon.svg"
import { PackageList } from "../../packageList/PackageList"
import { BasicPackage } from "./basicPackage/BasicPackage"
import { AdvancedPackage } from "./advancedPackage/AdvancedPackage"
import { PremiumPackage } from "./premiumPackage/PremiumPackage"
import { Button } from "../../../components/button/Button"
import { Access } from "../../profile/packageInfo/PackageInfo"
import { useEffect, useState } from "react"


type Props = {
  name: string;
  dateExpiry?: string;
  access: string;


}



export function PackageInfo({ name, access, dateExpiry }: Props) {

  // useEffect(() => {
    
  //   readAccess()

  // }, []);
 
  


  if (!(access == "user")) {

    if (access == "basic") {
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
              Дата истечения срока подписки {dateExpiry}
            </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>
        </div>
      )
    }
    else if (access == "advanced") {
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
              Дата истечения срока подписки {dateExpiry}
            </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>
          </div>
        </div>
      )
    }
    else if (access == "premium") {
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
              Дата истечения срока подписки {dateExpiry}
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


  else if (access = "user") {
    return (
      <div>

        <div className={styles.container}>
          <div className={styles.title}>
            Добро пожаловать, {name}!
          </div>
          <div className={styles.subtitle}>
            Выберите пакет:
          </div>
          <PackageList isLogged = {true} access = "user"/>
        </div>


      </div>
    )


  }
}