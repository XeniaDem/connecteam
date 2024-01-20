
import styles from "./RealGames.module.css"
import ellipse from "./ellipse.svg"


export function RealGames() {


  return (
    <div>
      
      <div className={styles.title}>
        Реальные игры реальных людей
        
      </div>
      <div className={styles.container}>
      <div className={styles.ellipse}>
        <img src={ellipse} />
        </div>
      <div className={styles.video}>
      
        </div>
    </div>
    </div>





  )
}