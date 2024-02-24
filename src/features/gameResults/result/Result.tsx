import styles from "./Result.module.css"
import { DetailedResultModel } from "../detailedResult/DetailedResult";


type Props = {
  savedResult: DetailedResultModel;
}


export function Result({savedResult}: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rectangle} style={{height: savedResult.result * 4}}>
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