import { Button, Divider, Grid, Box } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from "react-i18next";
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { useNavigate } from "react-router-dom";

export interface NewAddressListItemProps {
    type: "billing" | "delivery";
}

export function NewAddressListItem(props: NewAddressListItemProps) {
    const { type } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Box sx={{
        p: 2,
        border: 2,
        borderRadius: 4,
        minHeight: "260px"
    }}>
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                    onClick={() => {
                        navigate(`/account/addresses/${type}/new`);
                    }}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}>
                    {t("Pages.Addresses.AddressLineItem.AddNew")}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <AddLocationAltOutlinedIcon
                    color="disabled"
                    sx={{
                        fontSize: 150
                    }} />
            </Grid>
        </Grid>
    </Box>
}