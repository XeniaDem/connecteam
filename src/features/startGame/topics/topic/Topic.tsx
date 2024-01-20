
import { CheckBox } from "../../../../components/checkBox/CheckBox";
import styles from "./Topic.module.css"

import ellipse from "./ellipse.svg"




type Props = {
  name: string;

  imageUrl?: URL;

  isChecked: boolean;

  onClick?: () => void;


}

Topic.defaultProps = { name: "Образование", isChecked: false }

export function Topic(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/


  return (
    <div>
      <div className={styles.container}>

        <div className={styles.icon}>
          <div className={styles.ellipse}>
            <img src={ellipse} />
          </div>
          @

        </div>
        <div className={styles.name}>
          {props.name}

        </div>

        {props.isChecked ? (
          <CheckBox />
        ) : (
          <div />
        )}














      </div>

    </div>
  )
}