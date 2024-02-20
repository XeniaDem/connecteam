import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "../Layout.module.css"
import { useCheckAuth } from "../../../app/hooks/useCheckAuth";




export function UserLayout() {

    useCheckAuth();


    return (
        <div>
            <div className={styles.header}>
                <Header loggedHeader={true}/> 
            </div>
            <Outlet />

        </div>
    )

}