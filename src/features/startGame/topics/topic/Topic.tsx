
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


  selected?: boolean;
  inactive?: boolean;




}

Topic.defaultProps = { name: "Образование", withCheckBox: false }

export function Topic(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/

  const [selected, setSelected] = React.useState(props.selected);

  const handleChange = () => {
    alert(selected)
    setSelected(!selected);


  };

  const nothing = () => {

  };




  return (
    <div>
      <div className={!selected ? (!props.inactive ? styles.container : styles.inactive) : styles.selected}
        onClick={(props.withCheckBox || props.inactive) ? nothing : handleChange}>

        <div className={styles.icon}>
          <div className={styles.ellipse}>
            <img src={ellipse} />
          </div>
          <TopicIcon fontSize="medium" />

        </div>
        <div className={styles.name}>
          {props.name}

        </div>

        {props.withCheckBox ? (
          <CheckBox checked={selected} onClick={handleChange} />
        ) : (
          <div />
        )}














      </div>

    </div>
  )
}