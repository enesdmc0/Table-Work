import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from "jotai"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
    <Toaster />
  </Provider>,
)
