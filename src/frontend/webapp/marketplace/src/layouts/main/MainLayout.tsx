import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Environment, RouteConfig } from "../../router/routes";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";

export default function MainLayout() {
    return <React.Fragment>
        <Header />
        <Container
            component={"main"}
            maxWidth={"xl"}
            sx={{
                mt: 23,
                mb: 8,
                minHeight: "680px"
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

const ComingSoonPage = React.lazy(() => import("../../pages/main/coming-soon/ComingSoon"));

const VerificationPage = React.lazy(() => import("../../pages/main/verification/Verification"));
const AccountCreatedPage = React.lazy(() => import("../../pages/main/verification/AccountCreated"));
const AccountVerifiedPage = React.lazy(() => import("../../pages/main/verification/AccountVerified"));
const AccountVerificationFailedPage = React.lazy(() => import("../../pages/main/verification/AccountVerificationFailed"));
const MainPage = React.lazy(() => import("../../pages/main/landing/Landing"));
const SearchPage = React.lazy(() => import("../../pages/shared/Search"));
const AccountPage = React.lazy(() => import("../../pages/main/account/Account"));
const AddressesPage = React.lazy(() => import("../../pages/main/account/addresses/Addresses"));
const BillingAddressesPage = React.lazy(() => import("../../pages/main/account/addresses/BillingAddresses"));
const DeliveryAddressesPage = React.lazy(() => import("../../pages/main/account/addresses/DeliveryAddresses"));
const PaymentMethodsPage = React.lazy(() => import("../../pages/main/account/payment-methods/PaymentMethods"));
const AccountSettingsPage = React.lazy(() => import("../../pages/main/account/settings/AccountSettings"));
const SalesOrdersPage = React.lazy(() => import("../../pages/main/account/sales-orders/SalesOrders"));
const UpdateBillingAddressPage = React.lazy(() => import("../../pages/main/account/addresses/UpdateBillingAddressForm"));
const UpdateDeliveryAddressPage = React.lazy(() => import("../../pages/main/account/addresses/UpdateDeliveryAddressForm"));
const CreateDeliveryAddressPage = React.lazy(() => import("../../pages/main/account/addresses/CreateDeliveryAddressForm"));
const CreateBillingAddressPage = React.lazy(() => import("../../pages/main/account/addresses/CreateBillingAddressForm"));
const CreatePaymentMethodPage = React.lazy(() => import("../../pages/main/account/payment-methods/CreatePaymentMethodForm"));
const ProductDetailsPage = React.lazy(() => import("../../pages/main/products/ProductDetails"));

export const mainRoutes: RouteConfig = {
    path: "/",
    element: <MainLayout />,
    leafNodes: [
        {
            path:"",
            element: <ComingSoonPage />,
            disabledEnvironments: ["development"]
        },
        {
            path: "verification",
            element: <VerificationPage />,
            disabledEnvironments: ["production"],
            leafNodes: [
                {
                    path: "account-created",
                    element: <AccountCreatedPage />,
                },
                {
                    path: "account-verified",
                    element: <AccountVerifiedPage />
                },
                {
                    path: "account-verification-failed",
                    element: <AccountVerificationFailedPage />
                },
            ]
        },
        {
            path: "",
            element: <MainPage />,
            disabledEnvironments: ["production"],
        },
        {
            path: "search",
            element: <SearchPage />,
            disabledEnvironments: ["production"],
        },
        {
            path: "account",
            element: <AccountPage />,
            disabledEnvironments: ["production"],
            isPublic: false,
            leafNodes: [
                {
                    path: "addresses",
                    element: <AddressesPage />,
                    leafNodes: [
                        {
                            path: "delivery",
                            element: <DeliveryAddressesPage />
                        },
                        {
                            path: "billing",
                            element: <BillingAddressesPage />
                        },
                        {
                            path: "billing/:billingAddressId/update",
                            element: <UpdateBillingAddressPage />
                        },
                        {
                            path: "delivery/:deliveryAddressId/update",
                            element: <UpdateDeliveryAddressPage />
                        },
                        {
                            path: "delivery/new",
                            element: <CreateDeliveryAddressPage />
                        },
                        {
                            path: "billing/new",
                            element: <CreateBillingAddressPage />
                        }
                    ]
                },
                {
                    path: "payment-methods",
                    element: <PaymentMethodsPage />
                },
                {
                    path: "payment-methods/new",
                    element: <CreatePaymentMethodPage />
                },
                {
                    path: "settings",
                    element: <AccountSettingsPage />
                },
                {
                    path: "sales-orders",
                    element: <SalesOrdersPage />
                }
            ]
        },
        {
            path: "products/:productId",
            element: <ProductDetailsPage />,
            disabledEnvironments: ["production"],
        }
    ]
}