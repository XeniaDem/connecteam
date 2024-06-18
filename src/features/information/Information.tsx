import styles from "./Information.module.css"
import { About } from "./about/About"
import { Contacts } from "./contacts/Contacts"
import { Faq } from "./faq/Faq"
import { Introduction } from "./introduction/Introduction"
import { KnowMore } from "./knowMore/KnowMore"
import { Plans } from "./plans/Plans"
import { RealGames } from "./realGames/RealGames"
import { WhatIs } from "./whatIs/WhatIs"
import { WhoPlay } from "./whoPlay/WhoPlay"
import { WhyNeed } from "./whyNeed/WhyNeed"
import {isMobile} from 'react-device-detect';


export function Information() {


  return (
    <div className={styles.container}>

      <Introduction />
      <About />
      <WhoPlay />
      <WhyNeed />
      <KnowMore />
      {!isMobile && <WhatIs />}
      <RealGames />
      <Plans />
      <Faq />
      <Contacts/>

    </div>
  )
}
