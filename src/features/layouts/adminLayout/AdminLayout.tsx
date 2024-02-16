import { Outlet } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "../Layout.module.css"




export function AdminLayout() {


    return (
        <div>
            <div className={styles.header}>
                <Header adminHeader={true} />
            </div>
            <Outlet />

        </div>
    )

}