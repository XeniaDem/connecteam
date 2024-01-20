
import styles from "./Players.module.css"

import { Player } from "./player/Player"



type Props = {
  playersNum: number;
  


}

Players.defaultProps = { playersNum: 3 }

export function Players(props: Props) {
  const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }


  return (
    <div>
      <div className={styles.container}>

        <Player connected = {false}/>
        <Player joined = {false}/>
        <Player joined = {true} connected = {true} isCreator = {true}/>
        <Player joined = {true} connected = {true} isAnswering = {true}/>
        <Player joined = {true} connected = {true} isAnswering = {true} isCreator = {true}/>
        <Player joined = {true} connected = {true} isAnswering = {true} isCreator = {true} isYou = {true}/>
        
        {players}











      </div>

    </div>
  )
}