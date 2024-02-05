
import styles from "./Information.module.css"
import { About } from "./about/About"
import { BecomeMember } from "./becomeMember/BecomeMember"
import { Contacts } from "./contacts/Contacts"
import { Faq } from "./faq/Faq"
import { Intro } from "./intro/Intro"
import { Introduction } from "./introduction/Introduction"
import { KnowMore } from "./knowMore/KnowMore"
import { Packages } from "./packages/Packages"
import { RealGames } from "./realGames/RealGames"
import { WhatIs } from "./whatIs/WhatIs"
import { WhoPlay } from "./whoPlay/WhoPlay"
import { WhyNeed } from "./whyNeed/WhyNeed"
import disableScroll from 'disable-scroll';

export function Information() {

  disableScroll.off()


  return (
    <div className={styles.container}>

      <Introduction />
      <About />
      <WhoPlay />
      <WhyNeed />
      <KnowMore />
      <WhatIs />
      <RealGames />
      <Packages />
      {/* <BecomeMember /> */}
      <Faq />
      <Contacts/>

    </div>
  )
}
