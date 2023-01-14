import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { RouteConfig } from "../../router/routes";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";

export function DashboardLayout() {
    return <React.Fragment>
        <Header />
        <Container sx={{
            mt: 15
        }}>
            <AuthenticatedTemplate>
                <Outlet />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Outlet />
            </UnauthenticatedTemplate>
        </Container>
        <Footer />
    </React.Fragment>
}

const MainPage = React.lazy(() => import("../../pages/dashboard/main/Main"));

export const dashboardRoutes: RouteConfig = {
    path: "/dashboard",
    element: <DashboardLayout />,
    isPublic: false,
    leafNodes: [
        {
            path: "",
            element: <MainPage />
        },
    ]
}