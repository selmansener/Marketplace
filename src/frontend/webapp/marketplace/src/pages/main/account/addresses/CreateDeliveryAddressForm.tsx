import { Grid, IconButton, Box, Typography, Divider, FormControl, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Cities } from "../../../../components/address/Cities";
import { Districts } from "../../../../components/address/Districts";
import { useGetApiV1AddressGetCitiesQuery, usePostApiV1DeliveryAddressCreateMutation, CreateDeliveryAddress } from "../../../../store/api";
import * as Yup from "yup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function CreateDeliveryAddressForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [createDeliveryAddress, result] = usePostApiV1DeliveryAddressCreateMutation({});
    const isBusy = result.isLoading;
    const requiredField = t("FormValidation.RequiredField");
    const [selectedCity, setSelectedCity] = useState<string | undefined>();

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/account/addresses/delivery");
        }
        else if (result.isError) {
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
            name: "",
            city: "",
            district: "",
            email: "",
            phone: "",
            fullName: "",
            country: "Turkey",
            zipCode: "",
            fullAddress: ""
        }) as CreateDeliveryAddress,
        validationSchema: schema,
        onSubmit: (values) => {
            createDeliveryAddress({
                createDeliveryAddress: {
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
                    {t("Pages.CreateDeliveryAddress.New")}
                </Typography>
                <Typography variant="caption">
                    {t("Pages.CreateDeliveryAddress.Type")}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t("Pages.CreateDeliveryAddress.Name")}</Typography>}
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
                <TextField label={<Typography>{t('Pages.CreateDeliveryAddress.Phone')}</Typography>}
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
                <TextField label={<Typography>{t('Pages.CreateDeliveryAddress.Email')}</Typography>}
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
                <TextField label={<Typography>{t('Pages.CreateDeliveryAddress.FullName')}</Typography>}
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
                <TextField label={<Typography>{t("Pages.CreateDeliveryAddress.ZipCode")}</Typography>}
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
                    label={t("Pages.CreateDeliveryAddress.FullAddress")}
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
                severity={"error"}
                variant="filled"
                sx={{ width: '100%' }}>
                {t("Generic.Forms.Error")}
            </Alert> : <div></div>}
        </Snackbar>
    </Grid>
}