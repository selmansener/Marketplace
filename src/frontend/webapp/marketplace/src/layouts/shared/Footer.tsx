import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Box, Button, Container, Divider, Grid, Link, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { config } from "../../config";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright(props: any) {
    return (
        <Typography variant="body2" align="center" {...props} sx={{
            mb: 2
        }}>
            {'Copyright © '}
            Modilist
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const supportedLanguages = [
    {
        code: "tr",
        lang: "Türkçe",
        iconCode: "tr"
    },
    {
        code: "en",
        lang: "English",
        iconCode: "us"
    },
]

export function Footer() {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const { instagram, facebook, twitter, linkedIn } = config.socialMediaLinks;
    const { cdn, cdnImg: imgBaseHost } = config;

    const handleLanguageChange = (event: SelectChangeEvent) => {
        let lang;
        switch (event.target.value) {
            case "en":
            case "en-GB":
            case "en-US":
                lang = "en";
                break;
            case "tr":
                lang = "tr";
        }

        i18n.changeLanguage(lang);
    }

    const getLanguage = () => {
        switch (i18n.language) {
            case "en-GB":
            case "en-US":
            case "en":
                return "en";
            case "tr-TR":
            case "tr":
            default:
                return "tr";
        }
    }

    return <Box component="footer" sx={{
        backgroundColor: theme.palette.primary.main
    }}>
        <Container maxWidth={"xl"}>
            <Grid container spacing={2} sx={{
                display: { md: 'none' },
            }}>
                <Grid item xs={12} alignContent="center" textAlign="center" marginBottom={2}>
                    <Button variant="contained" color="secondary">
                        <NavLink to={"/contact"}>
                            <Typography color="#fff">
                                {t("Footer.Links.Contact")}
                            </Typography>
                        </NavLink>
                    </Button>
                </Grid>
                <Grid item xs={12} alignContent="center" textAlign="center">
                    <Link href={instagram} target="_blank" color="#fff" sx={{
                        px: [1]
                    }}>
                        <InstagramIcon />
                    </Link>
                    <Link href={facebook} target="_blank" color="#fff" sx={{
                        px: [1]
                    }}>
                        <FacebookIcon />
                    </Link>
                    <Link href={twitter} target="_blank" color="#fff" sx={{
                        px: [1]
                    }}>
                        <TwitterIcon />
                    </Link>
                    <Link href={linkedIn} target="_blank" color="#fff" sx={{
                        px: [1]
                    }}>
                        <LinkedInIcon />
                    </Link>
                </Grid>
                <Grid item xs={12} pr={2}>
                    <Divider color="#fff" />
                </Grid>
                <Grid item xs={12}>
                    <NavLink to={"/about"}>
                        <Typography color="#fff">
                            {t("Footer.Links.AboutUs")}
                        </Typography>
                    </NavLink>
                    <NavLink to={"#"}>
                        <Typography color="#fff">
                            {t("Footer.Links.FAQ")}
                        </Typography>
                    </NavLink>
                    <NavLink to={"/partnership"}>
                        <Typography color="#fff">
                            {t("Footer.Links.Partnership")}
                        </Typography>
                    </NavLink>
                    <NavLink to={"/careers"}>
                        <Typography color="#fff">
                            {t("Footer.Links.OpenPositions")}
                        </Typography>
                    </NavLink>
                    <NavLink to={"#"}>
                        <Typography color="#fff">
                            {t("Footer.Links.DeveloperAPI")}
                        </Typography>
                    </NavLink>
                </Grid>
                <Grid item xs={12} pr={2}>
                    <Divider color="#fff" />
                </Grid>
                <Grid item xs={12}>
                    <Link href={`${cdn}/contracts/gdpr.pdf`} target="_blank">
                        <Typography color="#fff">
                            {t("Footer.Links.KVKK")}
                        </Typography>
                    </Link>
                    <Link href={`${cdn}/contracts/distant-sales-contract.pdf`} target="_blank">
                        <Typography color="#fff">
                            {t("Footer.Links.OnlineSalesAgreement")}
                        </Typography>
                    </Link>
                    <Link href={`${cdn}/contracts/privacy-policy.pdf`} target="_blank">
                        <Typography color="#fff">
                            {t("Footer.Links.PrivacyAndCookiePolicies")}
                        </Typography>
                    </Link>
                    <Link href={`${cdn}/contracts/terms-of-use`} target="_blank">
                        <Typography color="#fff">
                            {t("Footer.Links.UsageAgreement")}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={12} pr={2}>
                    <Divider color="#fff" />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end" pr={2}>
                    <img src={`${imgBaseHost}/common/iyzico-footer-white.png`} height={25} />
                </Grid>
                <Grid item xs={12}>
                    <img src="/modilist-logo-large.png" height={100} />
                </Grid>
                <Grid item xs={12} pr={2}>
                    <Divider color="#fff" />
                </Grid>
                <Grid item xs={12}>
                    <Copyright color={theme.palette.primary.contrastText} />
                </Grid>
            </Grid>
            <Grid container item md={12} spacing={2} sx={{
                display: { xs: 'none', md: 'flex' },
            }}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={4} spacing={2}>
                        <Grid item xs={12}>
                            <img src="/modilist-logo-large.png" height={150} />
                        </Grid>
                        <Grid item xs={12}   marginBottom={2}>
                            <Button variant="contained" color="secondary">
                                <NavLink to={"/contact"}>
                                    <Typography color="#fff">
                                        {t("Footer.Links.Contact")}
                                    </Typography>
                                </NavLink>
                            </Button>
                        </Grid>
                        <Grid item xs={12}  >
                            <Link href={instagram} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <InstagramIcon />
                            </Link>
                            <Link href={facebook} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <FacebookIcon />
                            </Link>
                            <Link href={twitter} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <TwitterIcon />
                            </Link>
                            <Link href={linkedIn} target="_blank" color="#fff" sx={{
                                px: [1]
                            }}>
                                <LinkedInIcon />
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    <Grid item container xs={4} spacing={2}>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-start'
                        }}>
                            <NavLink to={"/about"}>
                                <Typography color="#fff">
                                    {t("Footer.Links.AboutUs")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Footer.Links.FAQ")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"/partnership"}>
                                <Typography color="#fff">
                                    {t("Footer.Links.Partnership")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"/careers"}>
                                <Typography color="#fff">
                                    {t("Footer.Links.OpenPositions")}
                                </Typography>
                            </NavLink>
                            <NavLink to={"#"}>
                                <Typography color="#fff">
                                    {t("Footer.Links.DeveloperAPI")}
                                </Typography>
                            </NavLink>
                        </Grid>
                        <Grid item xs={6} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-start'
                        }}>
                            <Link href={`${cdn}/contracts/gdpr.pdf`} target="_blank">
                                <Typography color="#fff">
                                    {t("Footer.Links.KVKK")}
                                </Typography>
                            </Link>
                            <Link href={`${cdn}/contracts/distant-sales-contract.pdf`} target="_blank">
                                <Typography color="#fff">
                                    {t("Footer.Links.OnlineSalesAgreement")}
                                </Typography>
                            </Link>
                            <Link href={`${cdn}/contracts/privacy-policy.pdf`} target="_blank">
                                <Typography color="#fff">
                                    {t("Footer.Links.PrivacyAndCookiePolicies")}
                                </Typography>
                            </Link>
                            <Link href={`${cdn}/contracts/terms-of-use`} target="_blank">
                                <Typography color="#fff">
                                    {t("Footer.Links.UsageAgreement")}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item container xs={4} >
                        <Grid item xs={12} sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Select
                                value={getLanguage()}
                                onChange={handleLanguageChange}
                                sx={{ mr: 2, backgroundColor: "#fff" }}
                            >
                                {supportedLanguages.map(supportedLang => (
                                    <MenuItem value={supportedLang.code} key={supportedLang.lang}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${supportedLang.iconCode}.png`}
                                            srcSet={`https://flagcdn.com/w40/${supportedLang.iconCode}.png 2x`}
                                            alt={supportedLang.code}
                                        />
                                        <Typography variant="caption" sx={{ pl: 1 }}>
                                            {supportedLang.lang}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end" pr={2}>
                            <img src={`${imgBaseHost}/common/iyzico-footer-white.png`} height={25} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider color="#fff" />
                    </Grid>
                    <Grid item xs={12}>
                        <Copyright color={theme.palette.primary.contrastText} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </Box>
}