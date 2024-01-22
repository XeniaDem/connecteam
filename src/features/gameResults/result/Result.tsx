
import styles from "./Result.module.css"


import { Button } from "../../../components/button/Button";




type Props = {
  name: string;
  isYou: boolean;
  score: number;
  style?: React.CSSProperties;



}

Result.defaultProps = { isYou: false, name: "Ксения", score: 40 }


export function Result(props: Props) {


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rectangle}>
          {props.score}
        </div>



        {props.isYou ? (

          <div className={styles.nameYou}>
            Вы
          </div>

        ) : (

          <div className={styles.name}>
            {props.name}
          </div>


        )
        }
      </div>








    </div>
  )


}