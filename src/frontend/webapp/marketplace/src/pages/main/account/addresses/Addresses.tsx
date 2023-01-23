import { Grid, Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Addresses() {
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const parsedLocation = location.pathname.split('/').at(-1);

    const handleChange = (event: SyntheticEvent<Element, Event>, value: any) => {
        navigate(`/account/addresses/${value}`);
    }

    const checkParsedLocation = (location?: string) => {
        return location === "billing" || location === "delivery";
    }

    return <Grid container spacing={2}>
        {checkParsedLocation(parsedLocation) && <Grid item xs={12}>
            <Tabs value={parsedLocation} onChange={handleChange} >
                <Tab label={t("Pages.Account.AddressesPage.Delivery")} value="delivery"  />
                <Tab label={t("Pages.Account.AddressesPage.Billing")} value="billing"  />
            </Tabs>
        </Grid>}
        <Grid item xs={12}>
            <Outlet />
        </Grid>
    </Grid>
}