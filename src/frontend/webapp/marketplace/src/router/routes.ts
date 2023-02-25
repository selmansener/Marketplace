import React from "react";
import { mainRoutes } from "../layouts/main/MainLayout";

export type Environment =
    | "production"
    | "staging"
    | "int"
    | "development";


enum Roles {
    Admin = "Admin",
    StyleAdvisor = "StyleAdvisor"
}

export interface RouteConfig {
    path: string;
    element: React.ReactNode;
    isPublic?: boolean;
    roles?: string[];
    disabledEnvironments?: Environment[];
    leafNodes?: RouteConfig[];
    loading?: React.ReactNode;
    error?: React.ReactNode;
    menuItem?: {
        name: string;
        icon: React.ReactNode;
    }
}

export const routes: RouteConfig[] = [
    mainRoutes,
];