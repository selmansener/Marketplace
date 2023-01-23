import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { AppBar, Box, Button, ButtonProps, Container, Grid, IconButton, Menu, MenuItem, styled, Toolbar, Typography, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { config } from "../../config";
import { SearchBar } from "./SearchBar";
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useTranslation } from "react-i18next";
import { femaleMenuItems, maleMenuItems, SubmenuProps } from "./data";

function AuthenticationButton() {
    const { instance: msal } = useMsal();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        const account = msal.getAllAccounts()[0];

        msal.logoutRedirect({
            account
        });
    }

    const login = () => {
        msal.loginRedirect(config.loginRequest)
            .catch(e => {
                console.log(e);
            });
    }

    const settings = [
        {
            text: "Orders",
            path: "/account/sales-orders"
        },
        {
            text: "MyAccount",
            path: "/account/settings"
        },
        {
            text: "Addresses",
            path: "/account/addresses/delivery"
        },
        {
            text: "PaymentMethods",
            path: "/account/payment-methods"
        }
    ];

    return <React.Fragment>
        <AuthenticatedTemplate>
            <Button onClick={handleOpenUserMenu}>
                <PersonIcon />
                {t("Generic.Auth.MyAccount")}
            </Button>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                        <Link to={setting.path}>
                            <Typography textAlign="center">
                                {t(`MyAccountMenu.${setting.text}`)}
                            </Typography>
                        </Link>
                    </MenuItem>
                ))}
                <MenuItem onClick={logout}>
                    <Typography>{t("Generic.Auth.Logout")}</Typography>
                </MenuItem>
            </Menu>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <Button onClick={login}>
                <PersonIcon />
                {t("Generic.Auth.SignIn")}
            </Button>
        </UnauthenticatedTemplate>
    </React.Fragment>
}

interface MenuButtonProps extends ButtonProps {
    isActive: boolean;
}

export function Header() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [activePage, setActivePage] = useState("");
    const [submenuState, setSubmenuState] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<SubmenuProps[]>();
    let timer: NodeJS.Timeout;

    const MenuButton = styled((props: MenuButtonProps) => {
        const { isActive, ...rest } = props;
        return <Button {...rest}></Button>
    })(({ theme, isActive }) => ({
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: isActive ? theme.palette.grey[100] : "initial",
        color: isActive ? theme.palette.text.primary : theme.palette.common.white,
        borderBottom: isActive ? 4 : 0,
        borderColor: isActive ? theme.palette.primary.main : 'unset',
        borderBottomStyle: isActive ? "solid" : 'unset',
        flexGrow: 1,
        marginLeft: 4,
        marginRight: 4,
        "&:hover": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.primary
        }
    }));

    const openSubmenuWithDelay = () => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            setSubmenuState(true);
            clearTimeout(timer);
        }, 500);
    }

    const closeSubmenu = () => {
        if (timer) {
            clearTimeout(timer);
        }

        setSubmenuState(false);
    }

    return <React.Fragment>
        <AppBar position="fixed" color="inherit">
            <Container maxWidth={"xl"}>
                <Toolbar>
                    <Box>
                        <NavLink to="/">
                            <img width={200} src="/originalhorizontallogoslogan.svg" />
                        </NavLink>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexGrow: 1,
                    }}>
                        <SearchBar />
                    </Box>
                    <Box ml={2}>
                        <AuthenticationButton />
                    </Box>
                    <Box ml={2}>
                        <Button>
                            <LocalMallIcon />
                            {t("Generic.MyBasket")}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
            <Box sx={{
                backgroundColor: theme.palette.secondary.main
            }}>
                <Container maxWidth={"xl"}>
                    <Toolbar sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-evenly"
                    }}>
                        <MenuButton isActive={activePage === "kadin"}
                            onClick={() => setActivePage("kadin")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(femaleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Kadın
                        </MenuButton>
                        <MenuButton isActive={activePage === "erkek"} onClick={() => setActivePage("erkek")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(maleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Erkek
                        </MenuButton>
                        <MenuButton isActive={activePage === "ayakkabi"} onClick={() => setActivePage("ayakkabi")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(femaleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Ayakkabı
                        </MenuButton>
                        <MenuButton isActive={activePage === "canta"} onClick={() => setActivePage("canta")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(femaleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Çanta
                        </MenuButton>
                        <MenuButton isActive={activePage === "aksesuar"} onClick={() => setActivePage("aksesuar")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(femaleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Aksesuar
                        </MenuButton>
                        <MenuButton isActive={activePage === "spor-outdoor"} onClick={() => setActivePage("spor-outdoor")}
                            onMouseOver={() => {
                                openSubmenuWithDelay();
                                setActiveSubmenu(femaleMenuItems);
                            }}
                            onMouseLeave={() => closeSubmenu()}>
                            Spor & Outdoor
                        </MenuButton>
                    </Toolbar>
                    <Box
                        onMouseOver={() => setSubmenuState(true)}
                        onMouseLeave={() => closeSubmenu()}
                        display={submenuState ? "block" : "none"}
                        py={submenuState ? [2] : [0]}>
                        <Grid container spacing={2}>
                            {activeSubmenu?.map((x, index) => {
                                return <Grid key={index} item xs={2}>
                                    <Link to={x.mainCategory.path}>
                                        <Typography variant="subtitle1" color={theme.palette.common.white} align="left" display="block">
                                            {x.mainCategory.text}
                                        </Typography>
                                    </Link>
                                    {x.subCategories.map((subcategory, i) =>
                                        <Link key={i} to={subcategory.path}>
                                            <Typography align="left" display="block" variant="body2" color={theme.palette.common.white}>
                                                {subcategory.text}
                                            </Typography>
                                        </Link>)}
                                </Grid>
                            })}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </AppBar>
    </React.Fragment>
}