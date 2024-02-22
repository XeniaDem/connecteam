import styles from "./PackageInfo.module.css"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import ellipse3 from "../ellipse3.svg"
import icon1 from "./icon1.svg"
import icon2 from "./icon2.svg"
import { PackageList } from "../../packageList/PackageList"


export type Plan = {
  planType: string;
  expiryDate: string;
  planAccess: string;
  planConfirmed: boolean;


}
type Props = {
  savedPlan: Plan | null;
  onChange: () => void;

}

export function PackageInfo({savedPlan, onChange }: Props) {



  return (
    <div id = "package_info">

      <div className={styles.container}>
      <div className={styles.ellipse1}>
            <img src={ellipse1} />
          </div>
          <div className={styles.ellipse2}>
            <img src={ellipse2} />
          </div>
          <div className={styles.ellipse3}>
            <img src={ellipse3} />
          </div>
          <div className={styles.icon1}>
            <img src={icon1} />
          </div>
          <div className={styles.icon2}>
            <img src={icon2} />
          </div>


          <div className={styles.title}>
            Доступ
          </div>
          <PackageList isLogged = {true} planInfo={savedPlan} onChange={onChange}/>
    
      </div>
    </div>
  )
}