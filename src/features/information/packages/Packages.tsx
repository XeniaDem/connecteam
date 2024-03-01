
import styles from "./Packages.module.css"
import rectangle from "./rectangle.svg"
import ellipse1 from "./ellipse1.svg"
import { PackageList } from "../../packageList/PackageList"
import { useIsMobile } from "../../../app/hooks/useIsMobile"


export function Packages() {

  const isMobile = useIsMobile()

  return (
    <div id = "packages">
      <div className={styles.title}>
        Форматы участия
      </div>
      <div className={styles.subtitle}>
        Выбор из трех пакетов
      </div>
      <div className={styles.container}>
        {!isMobile && <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>}
        <div className={styles.rectangle}>
          <img src={rectangle} />
        </div>
        <PackageList isLogged = {false}/>
        
      </div>


    </div>
  )
}