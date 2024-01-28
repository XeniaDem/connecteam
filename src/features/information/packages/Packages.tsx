
import styles from "./Packages.module.css"
import rectangle from "./rectangle.svg"
import ellipse1 from "./ellipse1.svg"
import { PackageList } from "../../packageList/PackageList"


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
        <PackageList basicActive = {false} advancedActive = {false} premiumActive = {false} isLogged = {false}/>
        
      </div>


    </div>
  )
}