import { Outlet } from "react-router";

export default function StudentLayout () {
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