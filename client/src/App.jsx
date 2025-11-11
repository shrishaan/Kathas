import { Button } from "@/components/ui/button"
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import { RouteIndex } from "./helpers/RouteName"
import Index from "./pages/Index"


const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path={RouteIndex} element={<Layout />} > {/* path will be dynamic */}
      <Route index element={<Index />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
