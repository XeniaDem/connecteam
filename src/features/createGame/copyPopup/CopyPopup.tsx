
import styles from "./CopyPopup.module.css"



export function CopyPopup() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.text}>
        Ссылка успешно скопирована.
        </div>
      </div>
    </div>
  )
}