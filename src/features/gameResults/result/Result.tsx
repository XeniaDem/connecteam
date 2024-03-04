import styles from "./Result.module.css"
import { DetailedResultModel } from "../detailedResult/DetailedResult";
import { isMobile } from "react-device-detect";


type Props = {
  savedResult: DetailedResultModel;
}


export function Result({savedResult}: Props) {
  
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rectangle} style={{height: (!isMobile ? savedResult.result * 4 : savedResult.result * 2)}}>
          {savedResult.result}
        </div>
        {savedResult.isYou ? (

          <div className={styles.nameYou}>
            Вы
          </div>

        ) : (

          <div className={styles.name}>
            {savedResult.name}
          </div>


        )
        }
      </div>
    </div>
  )
}