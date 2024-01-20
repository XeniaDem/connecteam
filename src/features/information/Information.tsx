
import styles from "./Information.module.css"
import { About } from "./about/About"
import { BecomeMember } from "./becomemember/BecomeMember"
import { Faq } from "./faq/Faq"
import { KnowMore } from "./knowmore/KnowMore"
import { Packages } from "./packages/Packages"
import { RealGames } from "./realgames/RealGames"
import { WhatIs } from "./whatis/WhatIs"
import { WhoPlay } from "./whoplay/WhoPlay"
import { WhyNeed } from "./whyneed/WhyNeed"

export function Information() {


  return (
    <div className={styles.container}>

      <About />
      <WhoPlay />
      <WhyNeed />
      <KnowMore />
      <WhatIs />
      <RealGames />
      <Packages/>
      <BecomeMember/>
      <Faq/>

    </div>
  )
}
