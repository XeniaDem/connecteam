
import { PlayerModel } from "../../gamePage/components/player/Player";
import { ResultModel } from "../result/Result";
import styles from "./Player.module.css"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


// export type PlayerModel = {
//   id: string;
//   isCreator: boolean;
//   isYou: boolean;
//   name: string;
//   photo: string;
// }
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
              <div />
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
              <div />
            )}
          </div>
        </div>

      )
      }
    </div>
  )
}