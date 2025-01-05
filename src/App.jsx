import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import { ThemeProvider } from "./context/theme-provider"
import Dashboard from "./pages/Dashboard"
import City from "./pages/City"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
  <ThemeProvider defaultTheme="dark">
  <Layout>
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/city/:name" element={<City/>}/>
    </Routes>
  </Layout>
  </ThemeProvider>
  </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
