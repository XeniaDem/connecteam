import { Outlet } from "react-router-dom";
import { Header } from "../../features/header/Header";
import styles from "../Layout.module.css"




export function AuthLayout() {


    return (
        <div>
            <div className={styles.header}>
                <Header authHeader={true} />
            </div>
            <Outlet />

        </div>
    )

}