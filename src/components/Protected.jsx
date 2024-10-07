import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected({isActive, route = "/login"}){
    if (isActive){
        return <Navigate to={route} replace/>;
    }
    return <Outlet />
};

export default Protected;