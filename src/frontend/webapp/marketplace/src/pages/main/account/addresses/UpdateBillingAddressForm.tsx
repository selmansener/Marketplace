import { Alert, Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate, useParams } from "react-router-dom";
import { BillingType, UpdateBillingAddress, useGetApiV1AddressGetCitiesQuery, useGetApiV1BillingAddressByBillingAddressIdQuery, usePostApiV1BillingAddressByBillingAddressIdUpdateMutation } from "../../../../store/api";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Cities } from "../../../../components/address/Cities";
import { Districts } from "../../../../components/address/Districts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { validateTaxNumber, validateIdNumber } from "../../../../utils/validators";

const billingTypes: BillingType[] = [
    "Individual",
    "Corporate"
];

export default function UpdateBillingAddressForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { billingAddressId } = useParams();
    const addressId = billingAddressId ? parseInt(billingAddressId) : 0;
    const [updateBillingAddress, result] = usePostApiV1BillingAddressByBillingAddressIdUpdateMutation({});
    const { isLoading: getCitiesIsLoading, isFetching: getCitiesIsFetching, data: cities, error: getCitiesError } = useGetApiV1AddressGetCitiesQuery({});
    const { isLoading, isFetching, data, error } = useGetApiV1BillingAddressByBillingAddressIdQuery({
        billingAddressId: addressId
    })
    const initialBillingAddress = data?.data;
    const isBusy = isLoading || isFetching || getCitiesIsLoading || getCitiesIsFetching || result.isLoading;
    const requiredField = t("FormValidation.RequiredField");
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    useEffect(() => {
        if (initialBillingAddress && cities) {
            const city = cities?.find((x: any) => x.name === initialBillingAddress?.details?.city);
            if (city) {
                setSelectedCity(city.code);
            }
        }
    }, [initialBillingAddress, cities]);

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
        fullAddress: Yup.string().required(requiredField),
        type: Yup.string().notOneOf(["None"], requiredField).required(requiredField),
        taxOffice: Yup.string().when("type", {
            is: (type: any) => type !== "Individual",
            then: Yup.string().required(requiredField),
            otherwise: Yup.string().optional()
        }),
        taxNumber: Yup.string().when("type", {
            is: (type: any) => type !== "Individual",
            then: Yup.string().required(requiredField).test({
                test: (value) => {
                    return validateTaxNumber(value);
                },
                message: t("FormValidation.InvalidTaxNumber")
            }),
            otherwise: Yup.string().optional()
        }),
        tckn: Yup.string().when("type", {
            is: (type: any) => type === "Individual",
            then: Yup.string().required(requiredField).test({
                test: (value) => {
                    return validateIdNumber(value);
                },
                message: t("FormValidation.InvalidIdNumber")
            }),
            otherwise: Yup.string().optional()
        })
    });

    const {
        values: billingAddress,
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
            type: initialBillingAddress?.type ?? "Individual",
            name: initialBillingAddress?.name ?? "",
            fullName: initialBillingAddress?.fullName ?? "",
            phone: initialBillingAddress?.phone ?? "",
            email: initialBillingAddress?.email ?? "",
            tckn: initialBillingAddress?.tckn ?? "",
            taxNumber: initialBillingAddress?.taxNumber ?? "",
            taxOffice: initialBillingAddress?.taxOffice ?? "",
            city: initialBillingAddress?.details?.city ?? "",
            district: initialBillingAddress?.details?.district ?? "",
            country: initialBillingAddress?.details?.country ?? "Turkey",
            zipCode: initialBillingAddress?.details?.zipCode ?? "",
            fullAddress: initialBillingAddress?.details?.fullAddress ?? "",
        }) as UpdateBillingAddress,
        validationSchema: schema,
        onSubmit: (values) => {
            updateBillingAddress({
                billingAddressId: addressId,
                updateBillingAddress: {
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
                    {initialBillingAddress?.name}
                </Typography>
                <Typography variant="caption">
                    {t("Pages.UpdateBillingAddress.Type")}
                </Typography>
            </Box>
        </Grid>
        
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t("Pages.UpdateBillingAddress.Name")}</Typography>}
                    name="name"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    error={touched.name && errors.name !== undefined}
                    variant="outlined"
                    value={billingAddress?.name} />
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Pages.UpdateBillingAddress.Phone')}</Typography>}
                    name="phone"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.phone && errors.phone}
                    error={touched.phone && errors.phone !== undefined}
                    variant="outlined"
                    value={billingAddress?.phone} />
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Pages.UpdateBillingAddress.Email')}</Typography>}
                    name="email"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && errors.email !== undefined}
                    variant="outlined"
                    value={billingAddress?.email} />
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth error={touched.type && errors.type !== undefined}>
                <InputLabel id={`billingType-label`}>{t("Pages.UpdateBillingAddress.BillingType")}</InputLabel>
                <Select
                    disabled={isBusy}
                    name={'type'}
                    labelId={`billingType-label`}
                    id={'billingType'}
                    value={billingAddress.type}
                    label={t("Pages.UpdateBillingAddress.BillingType")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem disabled value="None">
                        <em>{t('Generic.Forms.Select')}</em>
                    </MenuItem>
                    {billingTypes.map(billingType => {
                        return <MenuItem key={billingType} value={billingType.toString()}>{t(`Pages.UpdateBillingAddress.BillingTypes.${billingType}`)}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{touched.type && errors?.type}</FormHelperText>
            </FormControl>
        </Grid>
        {billingAddress.type === "Individual" && <Grid item xs={8}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t('Generic.PersonalInfo.IdNumber')}</Typography>}
                    name="tckn"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.tckn && errors.tckn}
                    error={touched.tckn && errors.tckn !== undefined}
                    variant="outlined"
                    value={billingAddress?.tckn} />
            </FormControl>
        </Grid>}
        {billingAddress.type === "Corporate" && <React.Fragment>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField label={<Typography>{t('Generic.Tenant.TaxNumber')}</Typography>}
                        name="taxNumber"
                        disabled={isBusy}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.taxNumber && errors.taxNumber}
                        error={touched.taxNumber && errors.taxNumber !== undefined}
                        variant="outlined"
                        value={billingAddress?.taxNumber} />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <TextField label={<Typography>{t('Generic.Tenant.TaxOffice')}</Typography>}
                        name="taxOffice"
                        disabled={isBusy}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.taxOffice && errors.taxOffice}
                        error={touched.taxOffice && errors.taxOffice !== undefined}
                        variant="outlined"
                        value={billingAddress?.taxOffice} />
                </FormControl>
            </Grid>
        </React.Fragment>}
        <Grid item xs={3}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t(`Pages.UpdateBillingAddress.${billingAddress.type === "Individual" ? "FullName" : "CorporateName"}`)}</Typography>}
                    name="fullName"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.fullName && errors.fullName}
                    error={touched.fullName && errors.fullName !== undefined}
                    variant="outlined"
                    value={billingAddress?.fullName} />
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <Cities
                    value={billingAddress?.city}
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
                    value={billingAddress?.district}
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
                <TextField label={<Typography>{t("Pages.UpdateBillingAddress.ZipCode")}</Typography>}
                    name="zipCode"
                    disabled={isBusy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    error={touched.name && errors.name !== undefined}
                    variant="outlined"
                    value={billingAddress?.zipCode} />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    disabled={isBusy}
                    name={"fullAddress"}
                    label={t("Pages.UpdateBillingAddress.FullAddress")}
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={billingAddress?.fullAddress}
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