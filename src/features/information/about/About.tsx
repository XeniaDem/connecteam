
import styles from "./About.module.css"
import photo from "./photo.svg"
import rectangle from "./rectangle.svg"
export function About() {

  return (
    <div className={styles.container} id = "about">
        <div className={styles.left}>
          <div className={styles.title}>
            О проекте
          </div>
          <div className={styles.photo}>
            <img src={photo} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            Бизнес-лагерь представляет собой кратковременно действующее игровое государство со своим законодательством, законодательной, исполнительной и судебной властями, реальными производствами, бизнесами, банками и биржами, силовыми структурами и налогами, избирательной системой и СМИ, со своей валютой и прочими атрибутами государства (государств), гражданами которого являются слушатели, проходящие подготовку.
          </div>
          <div className={styles.rectangle}>
            <img src={rectangle} />
          </div>
          <div className={styles.name}>
            Светлана Иванова
          </div>
          <div className={styles.text}>
            Профессор психологии
          </div>

        </div>
    </div>
  )
}