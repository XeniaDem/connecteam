
import { Button } from "../../../../components/button/Button"
import styles from "./Answer.module.css"

type Props = {
  text: string;




}

Answer.defaultProps = {text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}

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