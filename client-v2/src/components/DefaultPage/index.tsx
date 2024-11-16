import { Outlet } from "react-router-dom";
import MenuPlatforms from "../MenuPlatforms";
import ContainerAds from "../ContainerAds";
import styles from './DefaultPage.module.css'

export default function DefaultPage() {
    return (
        <main className={styles.main}>
            <MenuPlatforms/>
            <Outlet/>
            <ContainerAds/>
        </main>
    )
}