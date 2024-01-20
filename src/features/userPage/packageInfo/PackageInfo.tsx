
import styles from "./PackageInfo.module.css"
import icon from "./icon.svg"
import { PackageList } from "../../packageList/PackageList"
import { SimplePackage } from "./simplePackage/SimplePackage"
import { ExtendedPackage } from "./extendedPackage/ExtendedPackage"
import { WidePackage } from "./widePackage/WidePackage"
import { Button } from "../../../components/button/Button"


type Props = {
  withPackage?: boolean;
  simpleActive?: boolean;
  extendedActive?: boolean;
  wideActive?: boolean;

}

PackageInfo.defaultProps = { withPackage: true, simpleActive: false, extendedActive: false, wideActive: true }


export function PackageInfo(props: Props) {


  if (props.withPackage) {


    if (props.simpleActive) {
      return (
        <div className={styles.container}>
          <div className={styles.icon}>
            <img src={icon} />
          </div>
          <div className={styles.title}>
            Добро пожаловать, name!
          </div>
          <div className={styles.subtitle}>
            Вам доступен пакет:
          </div>
          <SimplePackage />
          <div className={styles.footerContainer}>
            <div className={styles.footer}>
              Дата истечения срока подписки 01.01.2024
            </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>
        </div>
      )
    }
    else if (props.extendedActive) {
      return (
        <div>
          <div className={styles.container}>
            <div className={styles.icon}>
              <img src={icon} />
            </div>
            <div className={styles.title}>
              Добро пожаловать, name!
            </div>
            <div className={styles.subtitle}>
              Вам доступен пакет:
            </div>
            <ExtendedPackage />
            <div className={styles.footerContainer}>
            <div className={styles.footer}>
              Дата истечения срока подписки 01.01.2024
            </div>

              <Button text={"Сменить пакет"} onClick={function (): void {
                throw new Error("Function not implemented.")
              }} className={styles.button} />


            </div>
          </div>
        </div>
      )
    }
    else if (props.wideActive) {
      return (
        <div>
          <div className={styles.container}>
            <div className={styles.icon}>
              <img src={icon} />
            </div>
            <div className={styles.title}>
              Добро пожаловать, name!
            </div>
            <div className={styles.subtitle}>
              Вам доступен пакет:
            </div>
            <WidePackage />
            
            <div className={styles.footerContainer}>
            <div className={styles.footer}>
              Дата истечения срока подписки 01.01.2024
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


  else {
    return (
      <div>

        <div className={styles.container}>
          <div className={styles.title}>
            Добро пожаловать, name!
          </div>
          <div className={styles.subtitle}>
            Выберите пакет:
          </div>

          <PackageList simpleActive={false} extendedActive={false} wideActive={false} />








        </div>


      </div>
    )


  }
}