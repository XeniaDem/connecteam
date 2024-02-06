
import React from "react";
import { CheckBox } from "../../../components/checkBox/CheckBox";
import styles from "./Topic.module.css"

import ellipse from "./ellipse.svg"
import TopicIcon from '@mui/icons-material/Topic';
import { TopicModel } from "../../adminPage/questionsPage/topic/Topic";




type Props = {
  name: string;


  withCheckBox: boolean;


  selected: boolean;
  onTopicClicked: (selected: boolean) => void;
  inactive?: boolean;




}

Topic.defaultProps = { name: "Образование", withCheckBox: false }

export function Topic({ selected, onTopicClicked, withCheckBox, name, inactive }: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/


  const handleChange = () => {
    onTopicClicked(!selected);


  };



  return (
    <div>
      <div className={!selected ? (!inactive ? styles.container : styles.inactive) : styles.selected}
        onClick={(withCheckBox || inactive) ? () => null : handleChange}>

        <div className={styles.icon}>
          <div className={styles.ellipse}>
            <img src={ellipse} />
          </div>
          <TopicIcon fontSize="medium" />

        </div>
        <div className={styles.text}>
          <div className={styles.name}>
            {name}
          </div>

        </div>

        {withCheckBox ? (
          <CheckBox checked={selected} onClick={handleChange} />
        ) : (
          <div />
        )}


      </div>

    </div>
  )
}