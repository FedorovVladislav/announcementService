import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "@/store";
import {setupInterceptors} from "@/api/AxiosSingleton.ts";

// Настраиваем Axios interceptors для автоматической подстановки JWT токена
setupInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
