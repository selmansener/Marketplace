import React, { Suspense } from "react";
import { createRoutesFromElements, Route, RouterProvider, useRouteError } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/loading/loading";
import NotFound from "../layouts/notFound/NotFound";
import { RouteConfig } from "./routes";

function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    return <div>Dang!</div>;
}

export interface RouterProps {
    isPublic: boolean;
    routes: RouteConfig[];
    currentAccountRole: string;
    environment: string;
}

export function Router(props: RouterProps) {
    const { routes, isPublic, currentAccountRole, environment } = props;

    function RenderRoutes(route: RouteConfig) {
        if (route === undefined) {
            return;
        }

        if (route.isPublic !== undefined && route.isPublic !== isPublic) {
            return;
        }

        if (route.roles && route.roles.length > 0 && route.roles.every(role => currentAccountRole !== role)) {
            return;
        }

        if (route.disabledEnvironments?.some(env => env === environment)) {
            return;
        }

        return <Route key={route.path} path={route.path} element={<Suspense fallback={route.loading ?? <Loading />}>{route.element}</Suspense>} errorElement={route.error ?? <ErrorBoundary />}>
            {route.leafNodes && route.leafNodes?.length > 0 && route.leafNodes.map(leafNode => RenderRoutes(leafNode))}
        </Route>
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <React.Fragment>
                {routes.filter(route => !route.disabledEnvironments?.some(env => env === environment)).map(route => RenderRoutes(route))}
                <Route path="*" element={<NotFound />} />
            </React.Fragment>
        ));

    return <RouterProvider router={router} />;
}