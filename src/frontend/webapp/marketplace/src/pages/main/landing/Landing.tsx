import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Brands } from "../../shared/Brands";
import { ContentProps, HorizontalSection } from "./components/HorizontalSection";

export default function Landing() {
    const { t } = useTranslation();

    const featuredContent: ContentProps[] = [
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        },
        {
            title: "test",
            description: "Lorem ipsum dolor sit amet",
            price: 150,
            img: "https://cdn.dsmcdn.com/mnresize/250/250/marketing/datascience/automation/2020/12/9/EnCokSatan_202012091129.png",
            imgAlt: "alt"
        }
    ];

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Brands />
        </Grid>
        <Grid item xs={12}>
            <HorizontalSection title={t("Pages.Main.Featured")} 
            content={featuredContent} />
        </Grid>
        <Grid item xs={12}>
            <HorizontalSection title={t("Pages.Main.TopSellers")} 
            content={featuredContent} />
        </Grid>
        <Grid item xs={12}>
            <HorizontalSection title={t("Pages.Main.Discounts")} 
            content={featuredContent} />
        </Grid>
    </Grid>
}