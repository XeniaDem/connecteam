
import { ResultModel } from "../result/Result";
import styles from "./Player.module.css"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


type Props = {
  savedPlayer: ResultModel;
}



export function Player({ savedPlayer }: Props) {

  return (
    <div>

      {savedPlayer.isYou ? (
        <div className={styles.container}>
          <div className={styles.photo}>
            {savedPlayer.photoUrl == "" ? <PhotoCameraIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} /> : <img src={savedPlayer.photoUrl} />}
          </div>
          <div className={styles.nameYou}>
            Вы
            {savedPlayer.isCreator ? (
              <div className={styles.nameYou}>
                (Организатор)
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.photo}>
            {savedPlayer.photoUrl == "" ? <PhotoCameraIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} /> : <img src={savedPlayer.photoUrl} />}
          </div>
          <div className={styles.name}>
            {savedPlayer.name}
            {savedPlayer.isCreator ? (
              <div className={styles.name}>
                (Организатор)
              </div>
            ) : (
              null
            )}
          </div>
        </div>
      )
      }
    </div>
  )
}