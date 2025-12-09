import { Outlet } from "react-router";

export default function AdminLayout () {
    return(
        <>
        <head></head>
        <main>
            <Outlet/>
        </main>
        <footer></footer>
        </>
    )
}