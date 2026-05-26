import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeContextProvider>
  </BrowserRouter>
)
