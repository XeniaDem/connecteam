
import { Button } from "../../../../components/button/Button"
import styles from "./Answer.module.css"

type Props = {
  text: string;




}


export function Answer(props: Props) {
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.text}>
         {props.text}
         </div>
      </div>
      
    </div>
  )
}