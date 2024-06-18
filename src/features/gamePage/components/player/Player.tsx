
import styles from "./Player.module.css"
import smallCrown from "./smallCrown.svg"
import photo from "./samplePhoto.svg"
import { useSelector } from "react-redux";
import { selectGame } from "../../../../store/gameSlice";

export type PlayerModel = {

  id: string;
  isCreator: boolean;
  isYou: boolean;
  name: string;
  photoUrl: string;

}

type Props = {
  savedPlayer?: PlayerModel;
  isAnswering: boolean

}


export function Player({savedPlayer, isAnswering }: Props) {


  const game = useSelector(selectGame)

  if (savedPlayer) {
    return (
      <div>
        {savedPlayer.isCreator ? (
          <div className={styles.container}>
            <div className={styles.smallCrown}>
              <img src={smallCrown} />
            </div>




          </div>
        ) : (
          <div className={styles.container}>

          </div>
        )}

        {isAnswering ? ( ////////////////
          <div className={styles.photoAnswering}>
            <img src={photo} />
          </div>
        ) : (
          <div className={styles.photo}>
            <img src={photo} />
          </div>

        )
        }


        {savedPlayer.isYou ? (
          <div className={styles.nameYou}>
            Вы
          </div>
        ) : (
          <div className={styles.name}>
            {savedPlayer.name}
          </div>

        )
        }



      </div>
    )
  }
}