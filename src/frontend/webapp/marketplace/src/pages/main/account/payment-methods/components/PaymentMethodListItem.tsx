import { Box, Grid, Typography, Tooltip, Button, Divider, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { config } from "../../../../../config";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { PaymentMethodDto } from "../../../../../store/api";

export interface PaymentMethodListItemProps {
    paymentMethod: PaymentMethodDto,
    onDeleteHandler: (id?: number, name?: string) => void;
}

export function PaymentMethodListItem(props: PaymentMethodListItemProps) {
    const { t } = useTranslation();
    const { paymentMethod, onDeleteHandler } = props;
    const { cdnImg: imgBaseHost } = config;

    const getMaskedCardNumber = () => {
        let cardNumber: string | null | undefined = paymentMethod?.binNumber;

        if (!cardNumber) {
            return "";
        }

        let endResult = "";
        for (let i = 0; i < 5; i++) {
            if (i * 4 > cardNumber.length) {
                endResult += " ****";
                continue;
            }

            if (i !== 0) {
                endResult += (" " + cardNumber.substring(i * 4, 4));
            }
            else {
                endResult += cardNumber.substring(i * 4, 4);
            }
        }

        return endResult;
    }

    return <Box  sx={{
        p: 2,
        border: 2,
        borderRadius: 4,
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6} display="flex" alignItems="center">
                <Typography variant="body1" component="span" fontWeight={800}>
                    {paymentMethod.cardName}
                </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
                <IconButton
                    title={t("Generic.Forms.Delete")}
                    color="error"
                    onClick={() => onDeleteHandler(paymentMethod.id, paymentMethod.cardName)}
                >
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} display="flex" alignItems="center">
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.BankName")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {paymentMethod.cardBankName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.PaymentMethods.PaymentMethodListItem.CardNumber")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {getMaskedCardNumber()}
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <img src={`${imgBaseHost}/card-logo/${paymentMethod.cardAssociation}.svg`} width={150} />
            </Grid>
        </Grid>
    </Box>
}