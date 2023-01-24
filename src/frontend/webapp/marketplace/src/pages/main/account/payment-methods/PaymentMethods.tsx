import { Alert, Grid, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../../../components/loading/loading";
import { useGetApiV1PaymentMethodGetAllQuery, usePostApiV1PaymentMethodByPaymentMethodIdDeleteMutation } from "../../../../store/api";
import { DeletePaymentMethodConfirmation } from "./components/DeletePaymentMethodConfirmation";
import { NewPaymentMethodListItem } from "./components/NewPaymentMethodListItem";
import { PaymentMethodListItem } from "./components/PaymentMethodListItem";

export default function PaymentMethods() {
    const { t } = useTranslation();
    const [deletePaymentMethod, result] = usePostApiV1PaymentMethodByPaymentMethodIdDeleteMutation({});
    const { isLoading, isFetching, data, error, refetch } = useGetApiV1PaymentMethodGetAllQuery({});
    const isBusy = isLoading || isFetching || result.isLoading;
    const paymentMethods = data?.data;
    const [cardId, setCardId] = useState(0);
    const [cardName, setCardName] = useState("");
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    useEffect(() => {
        if (!result.isUninitialized && !result.isLoading) {
            if (result.isSuccess) {
                refetch();
            }

            setSnackbarStatus(true);
        }
    }, [result]);

    if (isBusy) {
        return <Loading />
    }

    const handleDeleteButtonClick = (id?: number, name?: string) => {
        if (id && name) {
            setCardName(name);
            setCardId(id);
            setDeleteModalState(true);
        }
    }

    const handleDeleteConfirmation = (approved: boolean) => {
        setDeleteModalState(false);

        if (approved) {
            deletePaymentMethod({
                paymentMethodId: cardId
            })
        }
    }

    return <Grid container spacing={2}>
        {paymentMethods?.map((paymentMethod, i) => {
            return <Grid key={i} item xs={12} md={6} xl={4}>
                <PaymentMethodListItem
                    paymentMethod={paymentMethod}
                    onDeleteHandler={handleDeleteButtonClick}
                />
            </Grid>
        })}
        <Grid item xs={12} md={6} xl={4}>
            <NewPaymentMethodListItem />
        </Grid>
        <DeletePaymentMethodConfirmation
            cardName={cardName}
            open={deleteModalState}
            onClose={handleDeleteConfirmation}
        />
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
    </Grid >
}