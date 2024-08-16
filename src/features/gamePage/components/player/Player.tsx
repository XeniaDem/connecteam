import styles from "./Player.module.css"
import smallCrown from "./smallCrown.svg"
import photo from "./samplePhoto.svg"
import { useSelector } from "react-redux";
import { selectGame } from "../../../../store/gameSlice";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";


export type PlayerModel = {
  id: string;
  isCreator: boolean;
  isYou: boolean;
  name: string;
  photoUrl: string;

}

type Props = {
  savedPlayer?: PlayerModel;
  isAnswering: boolean;
  deleteUser: (id: string) => void;
}


export function Player({ savedPlayer, isAnswering, deleteUser }: Props) {

  const game = useSelector(selectGame)

  if (savedPlayer) {
    return (
      <div className={styles.container}>

      {game.creatorId == game.playerId && !savedPlayer.isCreator && <div className={styles.deleteButton}>
          <IconButton onClick={() => deleteUser(savedPlayer.id)}>
            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#55C6F7" />
                <stop offset={1} stopColor="#2AF8BA" />
              </linearGradient>
            </svg>
            <ClearIcon fontSize="medium" htmlColor="#ff0000" />

          </IconButton>
        </div>}
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