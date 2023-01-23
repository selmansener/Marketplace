import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

export interface DeleteAddressConfirmationProps {
    addressName: string;
    open: boolean;
    onClose: (approved: boolean) => void;
}

export function DeleteAddressConfirmation(props: DeleteAddressConfirmationProps) {
    const { t } = useTranslation();
    const { open, addressName, onClose } = props;

    return <Dialog
        open={open}
        onClose={() => onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {t("Pages.Addresses.DeleteAddressTitle")}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Trans>
                    {t("Pages.Addresses.DeleteAddressConfirmation", {
                        addressName
                    })}
                </Trans>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onClose(false)} color="error">{t("Generic.Forms.Cancel")}</Button>
            <Button onClick={() => onClose(true)} autoFocus color="success">
                {t("Generic.Forms.Approve")}
            </Button>
        </DialogActions>
    </Dialog>
}