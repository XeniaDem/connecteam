
import styles from "./Player.module.css"



type Props = {
  isCreator: boolean;
  isYou: boolean;

  name: string;


}

Player.defaultProps = { isCreator: false, isYou: false, name: "Ксения" }


export function Player(props: Props) {

  return (
    <div>

      {props.isYou ? (
        <div className={styles.container}>
          <div className={styles.nameYou}>
            Вы
            {props.isCreator ? (
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
          <div className={styles.name}>
            {props.name}
            {props.isCreator ? (
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