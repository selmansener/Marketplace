import { Alert, Grid, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../../../components/loading/loading";
import { useGetApiV1BillingAddressGetAllQuery, usePostApiV1BillingAddressByBillingAddressIdDeleteMutation } from "../../../../store/api";
import { AddressListItem } from "./components/AddressListItem";
import { DeleteAddressConfirmation } from "./components/DeleteAddressConfirmation";
import { NewAddressListItem } from "./components/NewAddressListItem";

export default function BillingAddresses() {
    const { t } = useTranslation();
    const [deleteBillingAddress, result] = usePostApiV1BillingAddressByBillingAddressIdDeleteMutation({});
    const { isLoading, isFetching, data, error, refetch } = useGetApiV1BillingAddressGetAllQuery({});
    const isBusy = isLoading || isFetching || result.isLoading;
    const billingAddresses = data?.data;
    const [addressName, setAddressName] = useState("");
    const [addressId, setAddressId] = useState(0);
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

    const handleDeleteButtonClick = (addressId?: number, name?: string) => {
        if (addressId && name) {
            setAddressName(name);
            setAddressId(addressId);
            setDeleteModalState(true);
        }
    }

    const handleDeleteConfirmation = (approved: boolean) => {
        setDeleteModalState(false);

        if (approved) {
            deleteBillingAddress({
                billingAddressId: addressId
            });
        }
    }

    return <Grid container spacing={2}>
        {billingAddresses?.map(address => {
            return (
                <Grid key={address.name} item xs={12} md={6} xl={4}>
                    <AddressListItem
                        id={address.id}
                        name={address.name}
                        city={address.details?.city}
                        district={address.details?.district}
                        fullAddress={address.details?.fullAddress}
                        type={"billing"}
                        billingType={address?.type}
                        onDeleteHandler={handleDeleteButtonClick}
                    />
                </Grid>
            )
        })}
        <Grid item xs={4}>
            <NewAddressListItem type={"billing"} />
        </Grid>
        <DeleteAddressConfirmation
            addressName={addressName}
            open={deleteModalState}
            onClose={handleDeleteConfirmation} />
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