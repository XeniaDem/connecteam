import { Outlet } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "../Layout.module.css"




export function UserLayout() {


    return (
        <div>
            <div className={styles.header}>
                <Header loggedHeader={true}/> 
            </div>
            <Outlet />

        </div>
    )

}