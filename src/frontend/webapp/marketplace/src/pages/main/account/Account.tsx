import { useMsal } from "@azure/msal-react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, MenuItem, MenuList, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../config";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";

export default function Account() {
    const routePrefix = "/account";
    const { instance: msal, accounts } = useMsal();
    const { resetRequest } = config;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [accordionExpanded, setAccordionExpanded] = useState(false);

    const resetPassword = () => {
        msal.loginRedirect({
            ...resetRequest,
            account: accounts[0]
        }).then(resp => console.log(resp));
    }

    const logout = () => {
        msal.logoutRedirect({
            account: accounts[0]
        });
    }

    const menuItems = [
        {
            path: `${routePrefix}/sales-orders`,
            title: "Pages.Account.Orders"
        },
        {
            path: `${routePrefix}/settings`,
            title: "Pages.Account.MyAccount",
        },
        {
            path: `${routePrefix}/payment-methods`,
            title: "Pages.Account.PaymentMethods",
        },
    ]

    useEffect(() => {
        if (location.pathname === "/account/addresses/delivery" || location.pathname === "/account/addresses/billing") {
            setAccordionExpanded(true);
        }
    }, [location])


    return <Grid container spacing={2}>
        <Grid item xs={2}>
            <Typography variant="h4" color="primary">{t("Pages.Account.Title")}</Typography>
            <Paper elevation={0} variant="outlined" sx={{
                mt: 2
            }}>
                <MenuList>
                    {menuItems.map(item => {
                        return <MenuItem sx={location.pathname === item.path ? {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            "&.MuiMenuItem-root:hover": {
                                color: theme.palette.text.primary,
                            }
                        } : undefined} key={item.path} onClick={() => {
                            navigate(item.path);
                        }}>{t(item.title)}</MenuItem>
                    })}
                    {/* TODO: implement recursive function for nested menu items */}
                    <MenuItem disableGutters sx={{
                        p: 0
                    }}>
                        <Accordion expanded={accordionExpanded} onChange={() => setAccordionExpanded(!accordionExpanded)} disableGutters elevation={0} square sx={{
                            width: "100%"
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>{t("Pages.Account.Addresses")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <MenuList>
                                    <MenuItem sx={location.pathname === "/account/addresses/delivery" ? {
                                        pl: 4,
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        "&.MuiMenuItem-root:hover": {
                                            color: theme.palette.text.primary,
                                        }
                                    } : { pl: 4 }} onClick={() => navigate("/account/addresses/delivery")}>
                                        {t("Pages.Account.AddressesPage.Delivery")}
                                    </MenuItem>
                                    <MenuItem sx={location.pathname === "/account/addresses/billing" ? {
                                        pl: 4,
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        "&.MuiMenuItem-root:hover": {
                                            color: theme.palette.text.primary,
                                        }
                                    } : { pl: 4 }} onClick={() => navigate("/account/addresses/billing")}>
                                        {t("Pages.Account.AddressesPage.Billing")}
                                    </MenuItem>
                                </MenuList>
                            </AccordionDetails>
                        </Accordion>
                    </MenuItem>
                    <MenuItem onClick={resetPassword}>{t("Pages.Account.ResetPassword")}</MenuItem>
                    <MenuItem onClick={logout}>{t("Pages.Account.Logout")}</MenuItem>
                </MenuList>
            </Paper>
        </Grid>
        <Grid item xs={10}>
            <Outlet />
        </Grid>
    </Grid>
}