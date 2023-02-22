import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { EditForm } from "../pages/EditForm";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/editform" element={<EditForm />}/>
        </Routes>
    );
}