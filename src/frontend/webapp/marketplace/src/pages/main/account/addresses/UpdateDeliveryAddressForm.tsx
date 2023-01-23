import { Alert, Box, Button, Divider, FormControl, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate, useParams } from "react-router-dom";
import { DeliveryAddressDto, UpdateDeliveryAddress, useGetApiV1AddressGetCitiesQuery, useGetApiV1DeliveryAddressByDeliveryAddressIdQuery, usePostApiV1DeliveryAddressByDeliveryAddressIdUpdateMutation } from "../../../../store/api";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Cities } from "../../../../components/address/Cities";
import { Districts } from "../../../../components/address/Districts";
import { useEffect, useState } from "react";

export default function UpdateDeliveryAddressForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const { deliveryAddressId } = useParams();
    const addressId = deliveryAddressId ? parseInt(deliveryAddressId) : 0;
    const [updateDeliveryAddress, result] = usePostApiV1DeliveryAddressByDeliveryAddressIdUpdateMutation({});
    const { isLoading: getCitiesIsLoading, isFetching: getCitiesIsFetching, data: cities, error: getCitiesError } = useGetApiV1AddressGetCitiesQuery({});
    const { isLoading, isFetching, data, error } = useGetApiV1DeliveryAddressByDeliveryAddressIdQuery({
        deliveryAddressId: addressId
    })
    const initialDeliveryAddress = data?.data;
    const isBusy = isLoading || isFetching || getCitiesIsLoading || getCitiesIsFetching || result.isLoading;
    const requiredField = t("FormValidation.RequiredField");
    const [selectedCity, setSelectedCity] = useState<string | undefined>();

    useEffect(() => {
        if (initialDeliveryAddress && cities) {
            const city = cities?.find((x: any) => x.name === initialDeliveryAddress?.details?.city);
            if (city) {
                setSelectedCity(city.code);
            }
        }
    }, [initialDeliveryAddress, cities]);

    useEffect(() => {
        if (result.isSuccess || result.isError) {
            setSnackbarStatus(true);
        }
    }, [result]);

    const schema = Yup.object({
        name: Yup.string().required(requiredField),
        city: Yup.string().required(requiredField),
        district: Yup.string().required(requiredField),
        email: Yup.string().email(t("FormValidation.Email")).required(requiredField),
        phone: Yup.string().required(requiredField),
        fullName: Yup.string().required(requiredField),
        country: Yup.string().required(requiredField),
        zipCode: Yup.string().required(requiredField),
        fullAddress: Yup.string().required(requiredField)
    });

    const {
        values: deliveryAddress,
        handleChange,
        handleBlur,
        touched,
        errors,
        setFieldValue,
        setFieldTouched,
        submitForm
    } = useFormik({
        enableReinitialize: true,
        initialValues: ({
            name: initialDeliveryAddress?.name ?? "",
            city: initialDeliveryAddress?.details?.city ?? "",
            district: initialDeliveryAddress?.details?.district ?? "",
            email: initialDeliveryAddress?.email ?? "",
            phone: initialDeliveryAddress?.phone ?? "",
            fullName: initialDeliveryAddress?.fullName ?? "",
            country: "Turkey",
            zipCode: initialDeliveryAddress?.details?.zipCode ?? "",
            fullAddress: initialDeliveryAddress?.details?.fullAddress ?? ""
        }) as UpdateDeliveryAddress,
        validationSchema: schema,
        onSubmit: (values) => {
            updateDeliveryAddress({
                deliveryAddressId: addressId,
                updateDeliveryAddress: {
                    ...values
                }
            })
        }
    });

    return <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center">
            <IconButton onClick={() => navigate(-1)} sx={{
                mr: 2
            }}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Box display="inline">
                <Typography variant="h5">
                    {initialDeliveryAddress?.name}
                </Typography>
                <Typography variant="caption">
                    {t("Pages.UpdateDeliveryAddress.Type")}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t("Pages.UpdateDeliveryAddress.Name")}</Typography>}
                    name="name"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    error={touched.name && errors.name !== undefined}
                    variant="outlined"
                    value={deliveryAddress?.name} />
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Pages.UpdateDeliveryAddress.Phone')}</Typography>}
                    name="phone"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.phone && errors.phone}
                    error={touched.phone && errors.phone !== undefined}
                    variant="outlined"
                    value={deliveryAddress?.phone} />
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Pages.UpdateDeliveryAddress.Email')}</Typography>}
                    name="email"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && errors.email !== undefined}
                    variant="outlined"
                    value={deliveryAddress?.email} />
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Pages.UpdateDeliveryAddress.FullName')}</Typography>}
                    name="fullName"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.fullName && errors.fullName}
                    error={touched.fullName && errors.fullName !== undefined}
                    variant="outlined"
                    value={deliveryAddress?.fullName} />
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <Cities
                    value={deliveryAddress?.city}
                    error={touched.city && errors.city !== undefined}
                    helperText={touched.city && errors?.city}
                    onChange={(city) => {
                        setSelectedCity(city.code);

                        setFieldValue("city", city.name);
                    }}
                    onBlur={(city) => {
                        setSelectedCity(city.code);

                        setFieldValue("city", city.name);

                        setFieldTouched("city");
                    }}
                />
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <Districts
                    selectedCity={selectedCity}
                    error={touched.district && errors.district !== undefined}
                    helperText={touched.district && errors?.district}
                    value={deliveryAddress?.district}
                    onChange={(district) => {
                        setFieldValue("district", district.name);
                    }}
                    onBlur={(district) => {
                        setFieldValue("district", district.name);

                        setFieldTouched("district");
                    }}
                />
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t("Pages.UpdateDeliveryAddress.ZipCode")}</Typography>}
                    name="zipCode"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    error={touched.name && errors.name !== undefined}
                    variant="outlined"
                    value={deliveryAddress?.zipCode} />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    disabled={isBusy}
                    name={"fullAddress"}
                    label={t("Pages.UpdateDeliveryAddress.FullAddress")}
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={deliveryAddress?.fullAddress}
                    error={touched.fullAddress && errors.fullAddress !== undefined}
                    helperText={touched.fullAddress && errors.fullAddress}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"flex-end"}>
            <Button
                disabled={isBusy}
                variant="contained"
                color="secondary"
                onClick={() => {
                    submitForm();
                }}
            >
                {t("Generic.Forms.Submit")}
            </Button>
        </Grid>
        <Snackbar
            open={snackbarStatus}
            autoHideDuration={6000}
            onClose={() => {
                setSnackbarStatus(false);
                if (!result.isUninitialized) {
                    result.reset();
                }

            }}>
            {!result.isUninitialized ? <Alert onClose={() => {
                setSnackbarStatus(false);
                if (!result.isUninitialized) {
                    result.reset();
                }
            }}
                severity={!result.isUninitialized ? (result.isSuccess ? "success" : "error") : "info"}
                variant="filled"
                sx={{ width: '100%' }}>
                {!result.isUninitialized ? t(`Generic.Forms.${result.isSuccess ? "Success" : "Error"}`) : ""}
            </Alert> : <div></div>}
        </Snackbar>
    </Grid>
}