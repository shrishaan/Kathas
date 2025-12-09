import { Button } from "@/components/ui/button";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteIndex, RouteSignIn, RouteSignUp } from "./helpers/RouteName";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          {" "}
          {/* path will be dynamic */}
          <Route index element={<Index />} />
        </Route>
        <Route path={RouteSignUp} element={<SignUp />} />
        <Route path={RouteSignIn} element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 

