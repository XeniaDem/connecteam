
import React from "react";
import styles from "./Topics.module.css"
import { Topic } from "./topic/Topic";




type Props = {
  withCheckBox: boolean;
  areChecked?: boolean;

  numTopics?: number;



}

Topics.defaultProps = { withCheckBox: false }

export function Topics(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    alert(checked)
    setChecked(!checked);


  };
  const nothing = () => {

  };




  return (
    <div>
      <div className={styles.container}>
        <div className={styles.line}>
          <Topic withCheckBox={props.withCheckBox} checked = {true} />
          <Topic withCheckBox={props.withCheckBox} checked = {true}/>
          <Topic withCheckBox={props.withCheckBox} />

        </div>
        <div className={styles.line}>
          <Topic withCheckBox={props.withCheckBox} />
          <Topic withCheckBox={props.withCheckBox} />
          <Topic withCheckBox={props.withCheckBox} />

        </div>
        <div className={styles.line}>
          <Topic withCheckBox={props.withCheckBox} />
          <Topic withCheckBox={props.withCheckBox} />
          <Topic withCheckBox={props.withCheckBox} />

        </div>
        <div className={styles.line}>
          <Topic withCheckBox={props.withCheckBox} />


        </div>



      </div>

    </div>
  )
}