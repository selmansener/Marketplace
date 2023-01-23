import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { useRef } from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export interface ContentProps {
    img: string;
    imgAlt: string;
    title: string;
    description: string;
    price: number;
}

export interface HorizontalSectionProps {
    title: string;
    content: ContentProps[];
}

export function HorizontalSection(props: HorizontalSectionProps) {
    const { title, content } = props;
    const theme = useTheme();
    const divRef = useRef<HTMLDivElement | null>(null);

    return <Box
        
        sx={{
            backgroundColor: theme.palette.secondary.transparent,
            p: 4,
            borderRadius: 2
        }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="left" variant="h4">
                    {title}
                </Typography>
            </Grid>
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
                        mx:[2]
                    }}>


                    {content.map((contentItem, index) => {
                        return <Card key={index}
                            sx={{
                                my: [2],
                                mr: 2,
                                minWidth: "180px"
                            }}>
                            <CardMedia
                                sx={{
                                    p: 2
                                }}
                                component="img"
                                alt={contentItem.imgAlt}
                                height="180"
                                image={contentItem.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {contentItem.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {contentItem.description}
                                </Typography>
                                <Typography>
                                    {contentItem.price} TL
                                </Typography>
                            </CardContent>
                        </Card>
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
    </Box>
}