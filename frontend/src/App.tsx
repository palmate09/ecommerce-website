import { Route, Routes } from "react-router-dom"
import { CartPage, ContactPage, LandingPage, ProductPage, SignInPage, SignUpPage } from "@/pages"
import { Toaster } from "react-hot-toast"
import { IconTimeDuration90 } from "@tabler/icons-react"
import { Test } from "./components/Test"

function App() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false} 
        toastOptions={IconTimeDuration90}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />      
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  )
}

export default App
