
import { useEffect } from "react";
import { ResultModel } from "../result/Result";
import styles from "./Player.module.css"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


type Props = {
  savedPlayer: ResultModel;
}



export function Player({ savedPlayer }: Props) {

  // useEffect(() => {
  //   console.log(savedPlayer)
  // }, []);
  return (
    <div>

      {savedPlayer.isYou ? (
        <div className={styles.container}>
          <div className={styles.photo}>
            {savedPlayer.photoUrl == "" ? <PhotoCameraIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} /> : <img src={savedPlayer.photoUrl} />}
          </div>
          <div className={styles.nameYou}>
            {savedPlayer.name}
            {savedPlayer.isCreator ? (
              <div className={styles.nameYou}>
                (Вы, организатор)
              </div>
            ) : (
              <div className={styles.nameYou}>
                (Вы)
              </div>
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