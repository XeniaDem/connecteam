
import styles from "./Topics.module.css"
import { Topic } from "./topic/Topic";




type Props = {
  areChecked: boolean;



}

Topics.defaultProps = { areChecked: false }

export function Topics(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.line}>
          <Topic isChecked = {props.areChecked}/>
          <Topic isChecked = {props.areChecked}/>
          <Topic isChecked = {props.areChecked}/>

        </div>
        <div className={styles.line}>
        <Topic isChecked = {props.areChecked}/>
        <Topic isChecked = {props.areChecked}/>
        <Topic isChecked = {props.areChecked}/>

        </div>
        <div className={styles.line}>
        <Topic isChecked = {props.areChecked}/>
        <Topic isChecked = {props.areChecked}/>
        <Topic isChecked = {props.areChecked}/>

        </div>
        <div className={styles.line}>
        <Topic isChecked = {props.areChecked}/>
        

        </div>



      </div>

    </div>
  )
}