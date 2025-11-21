import './App.css'
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import LayOut from "@/components/LayOut.tsx";
import PrivateRoutes from "@/components/PrivateRoutes.tsx";
import SignIn from './pages/SignInPage'
import {TestPage} from './pages/TestPage';
import FirstPage from './pages/FirstPage';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<LayOut/>}>
                        <Route path="/testPage" element={<TestPage/>}/>
                    </Route>
                </Route>
                <Route path="/firstPage" element={<FirstPage/>}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="*" element={<Navigate to="/signIn"/>}/>
            </Routes>
        </HashRouter>
    )
}

export default App
