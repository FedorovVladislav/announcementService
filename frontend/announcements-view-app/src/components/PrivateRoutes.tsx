import {Navigate, Outlet} from "react-router-dom"
import {RootState} from "@/store";
import {useAppSelector} from "@/hook/AppDispatch.ts";

export default function PrivateRoutes() {
    const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLogIn);
    return (
        <>
            {isLoggedIn ? <div><Outlet/></div> : <Navigate to="/signIn"/>}
        </>
    )
}
