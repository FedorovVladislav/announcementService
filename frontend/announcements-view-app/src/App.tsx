import './App.css'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import LayOut from "@/components/LayOut.tsx";
import PrivateRoutes from "@/components/PrivateRoutes.tsx";
import SignIn from './pages/SignInPage'
import {TestPage} from './pages/TestPage';
import {Registration} from "@/pages/RegistrationPage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {AnnouncementPage} from "@/pages/AnnouncementPage.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<LayOut/>}>
                        <Route path="/testPage" element={<TestPage/>}/>
                        <Route path="/announcement" element={<AnnouncementPage/>}/>
                    </Route>
                </Route>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="*" element={<Navigate to="/signIn"/>}/>
            </Routes>
            <Toaster />
        </HashRouter>
    )
}

export default App
