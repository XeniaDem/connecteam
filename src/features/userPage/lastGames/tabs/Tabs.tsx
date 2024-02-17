
import { ReactNode, useState } from "react"
import cn from 'classnames';
import styles from "./Tabs.module.css"


export type Tab = {
    tabName: string;
    tabContent: ReactNode;

}
type Props = {
    tabs: Tab[];


}


export function Tabs(props: Props) {

    const [activeTab, setActiveTab] = useState(props.tabs[0].tabName);
    const tab = props.tabs.find(tab => tab.tabName == activeTab)







    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    {props.tabs.map(tab => {
                        const classname = cn(styles.tab, { [styles.activeTab]: (activeTab == tab.tabName) })
                        return (
                            <div className={classname} onClick={() => setActiveTab(tab.tabName)}>

                                {tab.tabName}

                            </div>
                        )
                    })}



                </div>
                <div className={styles.rectangle} />




            </div>
            <div className={styles.content}>
                {tab?.tabContent || null}

            </div>

        </div >
    )
}