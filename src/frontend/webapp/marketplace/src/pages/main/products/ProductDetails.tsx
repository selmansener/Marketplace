import { Box, Button, Grid, Rating, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import { useGetApiV1ProductByProductIdQuery } from "../../../store/api";
import { VerticalImageList } from "./components/VerticalImageList";

export default function ProductDetails() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { productId } = useParams();
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const { isLoading, isFetching, data: productResponse, error } = useGetApiV1ProductByProductIdQuery({
        productId: productId ? parseInt(productId) : 0
    });
    const product = productResponse?.data;
    const isBusy = isLoading || isFetching;

    useEffect(() => {
        if (product && product?.images) {
            setSelectedImage(product?.images[0]);
        }
    }, [productResponse]);

    if (!product || isBusy) {
        return <Loading />;
    }

    return <Grid container spacing={4}>
        <Grid item xs={8} container spacing={4} alignItems="flex-start">
            <Grid item xs={3}>
                <VerticalImageList value={selectedImage} imageUrls={product.images} onChange={(url) => setSelectedImage(url)} />
            </Grid>
            <Grid item xs={9} display="flex" justifyContent="center" alignItems="center">
                {product?.images && <img src={selectedImage} width="100%" />}
            </Grid>
        </Grid>
        <Grid item xs={4} container spacing={2} alignContent="flex-start">
            <Grid item xs={12}>
                <Typography variant="h3">
                    {product.name}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">
                    {t("Pages.ProductDetails.ProductCode", {
                        sku: product.sku
                    })}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" align="right">
                    {t("Pages.ProductDetails.AskQuestion")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{
                    p: 1,
                    border: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.secondary.transparent,
                    display: 'inline-flex',
                }}>
                    <Typography variant="body2">
                        {t("Pages.ProductDetails.TenantName", {
                            tenantName: product.sku
                        })}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Rating readOnly value={4} />
            </Grid>
            <Grid item xs={6}>                
                <Box sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: theme.palette.primary.main,
                    display: 'inline-flex',
                }}>
                    <Typography variant="h6" color={theme.palette.common.white}>
                        {t("Pages.ProductDetails.SalesPrice", {
                            price: product.salesPrice
                        })}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Button variant="contained">
                    {t("Pages.ProductDetails.AddToBasket")}
                </Button>
            </Grid>
        </Grid>
    </Grid>
}