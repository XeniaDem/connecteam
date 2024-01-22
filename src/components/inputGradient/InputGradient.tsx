
import styles from "./InputGradient.module.css"
import cn from 'classnames';

type Props = {
  placeholder: string;
  className?: string;

}

export function InputGradient(props: Props) {
  /*const players = [];

  for (let i = 0; i < props.playersNum; i++) {
    players.push(<Player />)
  }*/


  return (
    <div>
      <div className={styles.container}>

      <input className={cn(styles.input, props.className)}  placeholder={props.placeholder} />


  


      </div>

    </div>
  )
}