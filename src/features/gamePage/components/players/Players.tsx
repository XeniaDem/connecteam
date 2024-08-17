import { useEffect, useState } from "react";
import { Player, PlayerModel } from "./player/Player";
import styles from "./Players.module.css"
import { useSelector } from "react-redux";
import { selectGame } from "../../../../store/gameSlice";



type Props = {
  players: string;
  deleteUser: (id: string) => void;
}



export function Players(props: Props) {

  const game = useSelector(selectGame)
  const [players, setPlayers] = useState<PlayerModel[] | null>(null)



  const readPlayers = () => {
    const messageParsed = JSON.parse(props.players);

    const playersNum = messageParsed.length
    const playersModels = [];

    const creatorId = game.creatorId
    const id = game.playerId

    for (let i = 0; i < playersNum; i++) {
      const playerModel = {
        id: messageParsed[i].id,
        isCreator: messageParsed[i].id == creatorId,
        isYou: messageParsed[i].id == id,
        name: messageParsed[i].name,
        photoUrl: "" ///////////////////
      }
      playersModels.push(playerModel)
    }
    setPlayers(playersModels)
    console.log("0: " + playersModels)
  }

  useEffect(() => {
    readPlayers()
  }, [props.players]);

  return (
    <div className={styles.container}>
      {players?.map(player =>
        <div>
          <Player savedPlayer={player} isAnswering={game.playerAnsweringId == player.id} deleteUser={props.deleteUser} />
        </div>
      )}
    </div>
  )
}