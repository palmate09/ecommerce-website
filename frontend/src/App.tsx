import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { Loader } from "@/components/ui/Loader"

// React.lazy expects a dynamic import that resolves to { default: Component }
const LandingPage = lazy(() => import("@/pages/LandingPage").then(module => ({ default: module.LandingPage })))
const ProductPage = lazy(() => import("@/pages/ProductPage").then(module => ({ default: module.ProductPage })))
const ContactPage = lazy(() => import("@/pages/ContactPage").then(module => ({ default: module.ContactPage })))
const CartPage = lazy(() => import("@/pages/CartPage").then(module => ({ default: module.CartPage })))
const SignInPage = lazy(() => import("@/pages/SignInPage").then(module => ({ default: module.SignInPage })))
const SignUpPage = lazy(() => import("@/pages/SignUpPage").then(module => ({ default: module.SignUpPage })))
const Test = lazy(() => import("./components/Test").then(module => ({ default: module.Test })))
const Practice = lazy(() => import("./components/Practice").then(module => ({ default: module.Practice })))

function App() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <ErrorBoundary>
        <Suspense fallback={<Loader className="h-screen"/>}>
          <Routes>
            <Route path="/" element={<ErrorBoundary><LandingPage /></ErrorBoundary>} />
            <Route path="/contact" element={<ErrorBoundary><ContactPage /></ErrorBoundary>} />
            <Route path="/product/:id" element={<ErrorBoundary><ProductPage /></ErrorBoundary>} />
            <Route path="/cart" element={<ErrorBoundary><CartPage /></ErrorBoundary>} />
            <Route path="/signin" element={<ErrorBoundary><SignInPage /></ErrorBoundary>} />
            <Route path="/signup" element={<ErrorBoundary><SignUpPage /></ErrorBoundary>} />
            <Route path="/test" element={<ErrorBoundary><Test /></ErrorBoundary>} />
            <Route path="/practice" element={<ErrorBoundary><Practice /></ErrorBoundary>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
