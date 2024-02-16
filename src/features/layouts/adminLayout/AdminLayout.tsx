import { Outlet } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "./AdminLayout.module.css"




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