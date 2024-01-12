import { Button } from "../../components/button/Button"
import styles from "./Information.module.css"
import { About } from "./about/About"
import { KnowMore } from "./knowmore/KnowMore"
import { WhatIs } from "./whatis/WhatIs"
import { WhoPlay } from "./whoplay/WhoPlay"
import { WhyNeed } from "./whyneed/WhyNeed"

export function Information() {


  return (
    <div className={styles.container}>
  
     <About/>
   <WhoPlay/>
   <WhyNeed/>
   <KnowMore/>
   <WhatIs/>

    </div>
  )
}
