import { Alert, Button, FormControl, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { useFormik } from "formik";
import { config } from "../../../../config";
import { usePostApiV1PaymentMethodCreateMutation } from "../../../../store/api";

interface InputMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value?: string;
}

const CreditCardInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function CreditCardInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0000 0000 0000 0000"

                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const ExpireMonthInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function ExpireMonthInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            />
        );
    },
);

const ExpireYearInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function ExpireYearInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

type FieldStates = {
    cardHolderName: boolean,
    cardNumber: boolean,
    expireMonth: boolean,
    expireYear: boolean,
    cardName: boolean
}

export default function CreatePaymentMethodForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isProduction } = config;
    const requiredField = t("FormValidation.RequiredField");
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const monthTwoDigits = t("Pages.NewPaymentMethod.MonthTwoDigits");
    const monthValidation = t("Pages.NewPaymentMethod.MonthValidation");
    const yearTwoDigits = t("Pages.NewPaymentMethod.YearTwoDigits");
    const yearValidation = t("Pages.NewPaymentMethod.YearValidation");
    const cardHolderNameValidation = t("Pages.NewPaymentMethod.CardHolderNameValidation");
    const CardNumber = t("FormValidation.CardNumber");
    const currentDate = new Date();
    const [createPaymentMethod, result] = usePostApiV1PaymentMethodCreateMutation({});
    const isBusy = result.isLoading;

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/account/payment-methods");
        }
        else if (result.isError) {
            setSnackbarStatus(true);
        }
    }, [result]);

    const schema = Yup.object({
        cardHolderName: Yup.string().test({
            name: "cardHolderNameValidation",
            message: cardHolderNameValidation,
            test: (value) => {
                if (Number(value)) {
                    return false;
                }
                return true
            }
        }).required(requiredField),
        cardNumber: Yup.string().test({
            name: 'CardNumber',
            message: `${CardNumber}`,
            test: (value) => {
                let valueArr = value?.split(" ");
                let valueFinal = "";
                valueArr?.forEach(value => {
                    valueFinal += value;
                })
                let cardReverse: any = [];
                cardReverse = valueFinal?.split('').reverse().map(num => parseInt(num));
                let cardEvenDigits: number[] = [];
                let cardOddDigits: number[] = [];
                let luhnSum1;
                let luhnSum2;
                let luhnSumFinal;

                for (let i = 0; i < cardReverse.length; i++) {
                    if (i % 2 == 1) {
                        if (cardReverse[i] * 2 < 10) {
                            cardEvenDigits.push(cardReverse[i] * 2);
                        }
                        else {
                            cardEvenDigits.push(cardReverse[i] * 2 % 10 + 1);
                        }
                    }
                    else {
                        cardOddDigits.push(cardReverse[i])
                    }
                }

                luhnSum1 = cardEvenDigits.reduce((prev, curr) => prev + curr);
                luhnSum2 = cardOddDigits.reduce((prev, curr) => prev + curr);
                luhnSumFinal = luhnSum1 + luhnSum2;

                return (luhnSumFinal % 10 == 0) && (value?.length == 19)
            }
        }).required(requiredField),
        expireMonth: Yup.string().when("expireYear", {
            is: (currentDate.getFullYear() % 1000).toString(),
            then: Yup.string().test({
                name: "monthValidation",
                message: monthValidation,
                test: (value) => {
                    if (value == undefined) {
                        return false
                    }
                    const valueAsNumber = parseInt(value);
                    const currentMonth = currentDate.getMonth() + 1;
                    return (
                        (valueAsNumber >= 1 && valueAsNumber <= 12) &&
                        (valueAsNumber > currentMonth)
                    )
                }
            }).length(2, monthTwoDigits).required(requiredField)
        }).test({
            name: "monthValidation",
            message: monthValidation,
            test: (value) => {
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    (valueAsNumber >= 1 && valueAsNumber <= 12)
                )
            }
        }).length(2, monthTwoDigits).required(requiredField), //i18n ile değiştir
        expireYear: Yup.string().test({
            name: "yearValidation",
            message: yearValidation,
            test: (value) => {
                const now = new Date();
                const yearTwoDigits = now.getFullYear() % 1000;
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    valueAsNumber >= yearTwoDigits
                )
            }
        }).length(2, yearTwoDigits).required(requiredField),
        cardName: Yup.string().required(requiredField)
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        values: creditCard,
        submitForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            cardHolderName: "",
            cardNumber: !isProduction ? "5526080000000006" : "",
            expireMonth: "",
            expireYear: "",
            cardName: "",
            isDefault: false
        },
        validationSchema: schema,
        onSubmit: (values) => {
            createPaymentMethod({
                createPaymentMethod: {
                    ...values
                }
            })
        },
    });

    return <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center">
            <IconButton onClick={() => navigate(-1)} sx={{
                mr: 2
            }}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography variant="h5">
                {t("Pages.PaymentMethods.New")}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth >
                <TextField
                    disabled={isBusy}
                    name="cardNumber"
                    error={touched.cardNumber && errors.cardNumber !== undefined}
                    helperText={touched.cardNumber && errors.cardNumber}
                    label={t("Pages.NewPaymentMethod.CardNumber")}
                    value={creditCard.cardNumber}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                        inputComponent: CreditCardInputMask as any,
                    }}
                />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth >
                <TextField
                    disabled={isBusy}
                    name="cardHolderName"
                    error={touched.cardHolderName && errors.cardHolderName !== undefined}
                    helperText={touched.cardHolderName && errors.cardHolderName}
                    label={t("Pages.NewPaymentMethod.CardHolderName")}
                    value={creditCard.cardHolderName}
                    variant="outlined"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                />
            </FormControl>
        </Grid>

        <Grid item xs={4}>
            <FormControl fullWidth >
                <TextField
                    disabled={isBusy}
                    name="expireMonth"
                    error={touched.expireMonth && errors.expireMonth !== undefined}
                    helperText={touched.expireMonth && errors.expireMonth}
                    label={t("Pages.NewPaymentMethod.ExpireMonth")}
                    value={creditCard.expireMonth}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                        inputComponent: ExpireMonthInputMask as any,
                    }}
                />
            </FormControl>
        </Grid>

        <Grid item xs={4}>
            <FormControl fullWidth >
                <TextField
                    disabled={isBusy}
                    name="expireYear"
                    error={touched.expireYear && errors.expireYear !== undefined}
                    helperText={touched.expireYear && errors.expireYear}
                    label={t("Pages.NewPaymentMethod.ExpireYear")}
                    value={creditCard.expireYear}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                        inputComponent: ExpireYearInputMask as any,
                    }}
                />
            </FormControl>
        </Grid>

        <Grid item xs={4}>
            <FormControl fullWidth >
                <TextField
                    disabled={isBusy}
                    name="cardName"
                    error={touched.cardName && errors.cardName !== undefined}
                    helperText={touched.cardName && errors.cardName}
                    label={t("Pages.NewPaymentMethod.CardName")}
                    value={creditCard.cardName}
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
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