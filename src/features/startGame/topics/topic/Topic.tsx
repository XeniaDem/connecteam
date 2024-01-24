
import React from "react";
import { CheckBox } from "../../../../components/checkBox/CheckBox";
import styles from "./Topic.module.css"

import ellipse from "./ellipse.svg"
import TopicIcon from '@mui/icons-material/Topic';




type Props = {
  name: string;

  imageUrl?: URL;

  withCheckBox: boolean;

  onClick?: () => void;


}

Topic.defaultProps = { name: "Образование", isChecked: false }

export function Topic(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    alert(checked)
    setChecked(!checked);

  };




  return (
    <div>
      <div className={!checked ? styles.container : styles.checked}>

        <div className={styles.icon}>
          <div className={styles.ellipse}>
            <img src={ellipse} />
          </div>
          <TopicIcon fontSize="medium"/>

        </div>
        <div className={styles.name}>
          {props.name}

        </div>

        {props.withCheckBox ? (
          <CheckBox/>
        ) : (
          <div />
        )}














      </div>

    </div>
  )
}