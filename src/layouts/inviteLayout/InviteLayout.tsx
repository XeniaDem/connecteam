import { Outlet } from "react-router-dom";
import { Header } from "../../features/header/Header";
import styles from "../Layout.module.css"


export function InviteLayout() {
    return (
        <div>
            <div className={styles.header}>
                <Header />
            </div>
            <Outlet />

        </div>
    )

}