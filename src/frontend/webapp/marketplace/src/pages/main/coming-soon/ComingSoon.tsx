import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { config } from "../../../config";

export default function ComingSoon() {
    const { cdnImg } = config;
    const { t } = useTranslation();

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h2" align="center">
                {t("Pages.ComingSoon")}
            </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
            <img src={`${cdnImg}/gender/female.svg`} alt="female" />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
            <img src={`${cdnImg}/gender/male.svg`} alt="male" />
        </Grid>
    </Grid>
}