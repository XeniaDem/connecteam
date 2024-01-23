
import styles from "./Information.module.css"
import { About } from "./about/About"
import { BecomeMember } from "./becomeMember/BecomeMember"
import { Faq } from "./faq/Faq"
import { Intro } from "./intro/Intro"
import { KnowMore } from "./knowMore/KnowMore"
import { Packages } from "./packages/Packages"
import { RealGames } from "./realGames/RealGames"
import { WhatIs } from "./whatIs/WhatIs"
import { WhoPlay } from "./whoPlay/WhoPlay"
import { WhyNeed } from "./whyNeed/WhyNeed"

export function Information() {


  return (
    <div className={styles.container}>

      <Intro />
      <About />
      <WhoPlay />
      <WhyNeed />
      <KnowMore />
      <WhatIs />
      <RealGames />
      <Packages />
      <BecomeMember />
      <Faq />

    </div>
  )
}
