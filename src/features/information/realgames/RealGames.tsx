
import styles from "./RealGames.module.css"
import ellipse from "./ellipse.svg"


export function RealGames() {


  return (
    <div id = "real_games">

      <div className={styles.title}>
        Реальные игры реальных людей

      </div>
      <div className={styles.container}>
        <div className={styles.ellipse}>
          <img src={ellipse} />
        </div>
        <div className={styles.video}>
          <div className={styles.text}>
            Тут будет видео

          </div>

        </div>
      </div>
    </div>





  )
}