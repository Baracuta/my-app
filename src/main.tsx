import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import{createBrowserRouter, RouterProvider, BrowserRouter} from "react-router-dom";



createRoot(document.getElementById('root')!).render(
    <App />
)
