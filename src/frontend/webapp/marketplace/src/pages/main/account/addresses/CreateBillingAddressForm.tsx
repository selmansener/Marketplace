import { Alert, Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BillingType, CreateBillingAddress, usePostApiV1BillingAddressCreateMutation } from "../../../../store/api";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validateTaxNumber, validateIdNumber } from "../../../../utils/validators";
import { Cities } from "../../../../components/address/Cities";
import { Districts } from "../../../../components/address/Districts";

const billingTypes: BillingType[] = [
    "Individual",
    "Corporate"
];

export default function CreateBillingAddressForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [createBillingAddress, result] = usePostApiV1BillingAddressCreateMutation({});
    const isBusy = result.isLoading;
    const requiredField = t("FormValidation.RequiredField");
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/account/addresses/billing");
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
            type: "Individual",
            name: "",
            fullName: "",
            phone: "",
            email: "",
            tckn: "",
            taxNumber: "",
            taxOffice: "",
            city: "",
            district: "",
            country: "Turkey",
            zipCode: "",
            fullAddress: "",
        }) as CreateBillingAddress,
        validationSchema: schema,
        onSubmit: (values) => {
            createBillingAddress({
                createBillingAddress: {
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
                    {t("Pages.CreateBillingAddress.New")}
                </Typography>
                <Typography variant="caption">
                    {t("Pages.CreateBillingAddress.Type")}
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Divider />
        </Grid>
        <Grid item xs={4}>
            <FormControl fullWidth>
                <TextField label={<Typography>{t("Pages.CreateBillingAddress.Name")}</Typography>}
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
                <TextField label={<Typography>{t('Pages.CreateBillingAddress.Phone')}</Typography>}
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
                <TextField label={<Typography>{t('Pages.CreateBillingAddress.Email')}</Typography>}
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
                <InputLabel id={`billingType-label`}>{t("Pages.CreateBillingAddress.BillingType")}</InputLabel>
                <Select
                    disabled={isBusy}
                    name={'type'}
                    labelId={`billingType-label`}
                    id={'billingType'}
                    value={billingAddress.type}
                    label={t("Pages.CreateBillingAddress.BillingType")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem disabled value="None">
                        <em>{t('Generic.Forms.Select')}</em>
                    </MenuItem>
                    {billingTypes.map(billingType => {
                        return <MenuItem key={billingType} value={billingType.toString()}>{t(`Pages.CreateBillingAddress.BillingTypes.${billingType}`)}</MenuItem>
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
                <TextField label={<Typography>{t(`Pages.CreateBillingAddress.${billingAddress.type === "Individual" ? "FullName" : "CorporateName"}`)}</Typography>}
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
                <TextField label={<Typography>{t("Pages.CreateBillingAddress.ZipCode")}</Typography>}
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
                    label={t("Pages.CreateBillingAddress.FullAddress")}
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
                severity={"error"}
                variant="filled"
                sx={{ width: '100%' }}>
                {t("Generic.Forms.Error")}
            </Alert> : <div></div>}
        </Snackbar>
    </Grid>
}