
import styles from "./UserPage.module.css"
import { LastGames } from "./lastGames/LastGames"
import { PackageInfo } from "./packageInfo/PackageInfo"



export function UserPage() {


  return (
    <div className={styles.container}>
      <PackageInfo/>
      {/* <LastGames /> */}

    </div>
  )
}
