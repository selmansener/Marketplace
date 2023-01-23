import { Box, Grid, IconButton, styled, Typography } from "@mui/material";
import { useRef } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from "react-router-dom";

export function Brands() {
    const divRef = useRef<HTMLDivElement | null>(null);

    const brands = [
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        },
        {
            name: "Mavi",
            logo: "https://cdn.dsmcdn.com/mnresize/200/200/marketing/datascience/Automation/BrandBoutique/2021/12/3/maviii.png"
        }
    ];

    const BrandImage = styled("img")(({ theme }) => ({
        width: "100px",
        borderRadius: "50%"
    }))

    return <Grid container spacing={2}>
        <Grid item xs={12} sx={{
            display: "flex",
            alignItems: "center"
        }}>
            <IconButton onClick={() => {
                if (divRef) {
                    divRef.current?.scroll({
                        behavior: "smooth",
                        left: divRef.current.scrollLeft - 400
                    })
                }
            }}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Box
                ref={divRef}
                sx={{
                    display: 'flex',
                    flexWrap: "nowrap",
                    overflowX: "hidden",
                    mx: [2]
                }}>
                {brands.map((brand, index) => {
                    return <Link key={index} to={`/search?q=${brand.name}`}>
                        <Box sx={{
                            mr: 2
                        }}>
                            <BrandImage src={brand.logo} />
                            <Typography>
                                {brand.name}
                            </Typography>
                        </Box>
                    </Link>
                })}
            </Box>

            <IconButton onClick={() => {
                if (divRef) {
                    divRef.current?.scroll({
                        behavior: "smooth",
                        left: divRef.current.scrollLeft + 400
                    })
                }
            }}>
                <KeyboardArrowRightIcon />
            </IconButton>
        </Grid>
    </Grid>
}