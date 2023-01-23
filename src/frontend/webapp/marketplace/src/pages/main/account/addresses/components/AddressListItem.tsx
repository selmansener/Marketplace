import { Grid, Typography, Button, Divider, Paper, Box, IconButton, Chip } from "@mui/material";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BillingType } from "../../../../../store/api";
import PersonIcon from '@mui/icons-material/Person';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

export interface AddressListItemProps {
    type: "billing" | "delivery";
    id?: number;
    name?: string;
    city?: string;
    district?: string;
    fullAddress?: string;
    billingType?: BillingType;
    onDeleteHandler: (addressId?: number, name?: string) => void;
}

export function AddressListItem(props: AddressListItemProps) {
    const { id, name, city, district, fullAddress, type, billingType, onDeleteHandler } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Box sx={{
        p: 2,
        border: 2,
        borderRadius: 4,
        minHeight: "260px"
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6} display="flex" alignItems="center">
                <Typography variant="body1" fontWeight={800}>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
                <IconButton
                    title={t("Generic.Forms.Edit")}
                    color="primary"
                    sx={{
                        mr: 1
                    }}
                    onClick={() => {
                        navigate(`/account/addresses/${type}/${id}/update`);
                    }}
                >
                    <EditLocationOutlinedIcon />
                </IconButton>
                <IconButton
                    title={t("Generic.Forms.Delete")}
                    color="error"
                    onClick={() => onDeleteHandler(id, name)}
                >
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.Addresses.AddressLineItem.City")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {city}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.Addresses.AddressLineItem.District")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {district}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body1" component="span" fontWeight={800}>
                    {t("Pages.Addresses.AddressLineItem.FullAddress")}
                </Typography>
                <Typography variant="body1" component="span" ml={1}>
                    {fullAddress}
                </Typography>
            </Grid>
            {type === "billing" && <Grid item xs={12}>
                {billingType === "Individual" ?
                    <Chip icon={<PersonIcon />} color="primary" label={t(`Pages.Addresses.AddressLineItem.BillingTypes.Individual`)} />
                    : <Chip icon={<CorporateFareIcon />} color="secondary" label={t(`Pages.Addresses.AddressLineItem.BillingTypes.Corporate`)} />}
            </Grid>}
        </Grid>
    </Box>
}