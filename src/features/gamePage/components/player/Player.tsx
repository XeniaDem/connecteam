
import styles from "./Player.module.css"
import smallCrown from "./smallCrown.svg"
import photo from "./samplePhoto.svg"


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


export function Player({ savedPlayer, isAnswering }: Props) {

  if (savedPlayer) {
    return (
      <div className={styles.container}>
        {savedPlayer.isCreator ? (
          <div className={styles.crown}>
            <div className={styles.smallCrown}>
              <img src={smallCrown} />
            </div>
          </div>
        ) : (
          null
        )}

        {isAnswering ? (
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