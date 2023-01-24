import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

export interface DeletePaymentMethodConfirmationProps {
    cardName: string;
    open: boolean;
    onClose: (approved: boolean) => void;
}

export function DeletePaymentMethodConfirmation(props: DeletePaymentMethodConfirmationProps) {
    const { t } = useTranslation();
    const { open, cardName, onClose } = props;

    return <Dialog
        open={open}
        onClose={() => onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {t("Pages.PaymentMethods.DeletePaymentMethodTitle")}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Trans>
                    {t("Pages.PaymentMethods.DeletePaymentMethodConfirmation", {
                        cardName
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