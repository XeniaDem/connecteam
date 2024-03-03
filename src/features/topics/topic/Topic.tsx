
import React from "react";
import { CheckBox } from "../../../components/checkBox/CheckBox";
import styles from "./Topic.module.css"

import ellipse from "./ellipse.svg"
import TopicIcon from '@mui/icons-material/Topic';
import { TopicModel } from "../../adminPage/questionsPage/topic/Topic";
import {isMobile} from 'react-device-detect';




type Props = {
  name: string;


  withCheckBox: boolean;

  selected: boolean;
  onTopicClicked: (selected: boolean) => void;
  inactive?: boolean;




}


export function Topic({ selected, onTopicClicked, withCheckBox, name, inactive }: Props) {



  const handleChange = () => {

    onTopicClicked(!selected);
    
  };



  return (
    <div>
      <div className={!selected ? (!inactive ? styles.container : styles.inactive) : styles.selected}
        onClick={(inactive || withCheckBox) ? () => null : handleChange}>

        {!isMobile && <div className={styles.icon}>
          <div className={styles.ellipse}>
            <img src={ellipse} />
          </div>
          <TopicIcon fontSize="medium" />

        </div>}
        <div className={styles.text}>
          <div className={styles.name}>
            {name}
          </div>

        </div>

        {withCheckBox ? (
          <div className={styles.checkBox}>
            <CheckBox checked={selected} setChecked={() => onTopicClicked(!selected)} disabled = {inactive}/>
          </div>
        ) : (
          <div />
        )}


      </div>

    </div>
  )
}