import { Box, Grid, IconButton } from "@mui/material";
import { useRef } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface VerticalImageListProps {
    imageUrls?: string[];
    value?: string;
    onChange: (selectedImage: string) => void;
}

export function VerticalImageList(props: VerticalImageListProps) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const { imageUrls, value, onChange } = props;

    if (!imageUrls) {
        return <></>
    }

    const getBoxSx = (url: string) => {
        const mainSx = {
            cursor: "pointer",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 2,
        }

        if (url === value) {
            return {
                ...mainSx,
                border: 2,
            }
        }

        return mainSx;
    }

    return <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center">
            <IconButton onClick={() => {
                if (divRef) {
                    divRef.current?.scroll({
                        behavior: "smooth",
                        top: divRef.current.scrollTop - 200
                    })
                }
            }}>
                <KeyboardArrowUpIcon />
            </IconButton>
        </Grid>
        <Grid item xs={12}>
            <Box ref={divRef}
                sx={{
                    maxHeight: "400px",
                    overflow: "hidden"
                }}>
                <Grid container spacing={2}>
                    {imageUrls.map((url, index) => {
                        return <Grid key={index} item xs={12}>
                            <Box sx={getBoxSx(url)}
                                onClick={() => onChange(url)}
                            >
                                <img src={url} width={"100%"} />
                            </Box>
                        </Grid>
                    })}
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
            <IconButton onClick={() => {
                if (divRef) {
                    divRef.current?.scroll({
                        behavior: "smooth",
                        top: divRef.current.scrollTop + 200
                    })
                }
            }}>
                <KeyboardArrowDownIcon />
            </IconButton>
        </Grid>
    </Grid>
}