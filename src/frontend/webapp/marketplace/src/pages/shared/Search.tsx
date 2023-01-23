import { ErrorBoundary, Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchProvider, Sorting, WithSearch } from "@elastic/react-search-ui";
import { Layout, MultiCheckboxFacet, ResultsViewProps, ResultViewProps } from "@elastic/react-search-ui-views";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { config } from "../../config/";

export default function Search() {
    const { searchKey, endpointBase, engineName } = config.elasticEngineConfig;
    const [searchParams] = useSearchParams();

    console.log(searchParams.get("q"));

    const connector = new AppSearchAPIConnector({
        searchKey,
        engineName,
        endpointBase,
    });


    const elasticConfig = {
        ...config.elasticEngineConfig,
        searchQuery: {
            disjunctiveFacets: ["category"],
            facets: config.elasticEngineConfig.facets.reduce((acc: any, n) => {
                acc = acc || {};
                acc[n] = {
                    type: "value",
                    size: 100
                };
                return acc;
            }, undefined)
        },
        apiConnector: connector,
        alwaysSearchOnInitialLoad: true
    };

    const facetTitleMapping = {
        "brand": "Marka",
        "category": "Kategori",
        "colors": "Renk",
        "details.collorType": "Yaka Tipi",
        "details.dressHeight": "Elbise Uzunluğu",
        "details.legType": "Bacak Tipi",
        "details.skirtHeight": "Etek Uzunluğu",
        "details.waistHeight": "Bel Yüksekliği",
        "gender": "Cinsiyet",
    };

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const CustomResultsView = (props: ResultsViewProps) => {
        const { children } = props;
        return (
            <Grid container spacing={2}>
                {children}
            </Grid>
        );
    };

    const CustomResultView = (props: ResultViewProps) => {
        const { result } = props;

        if (!result) {
            return <></>
        }

        return <Grid item container spacing={2} xs={4}>
            <Grid item xs={12}>
                <Link href={`/products/${result.id?.raw}`}>
                    <Typography>
                        {result.name?.raw}
                    </Typography>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <img src={`https://picsum.photos/id/${getRandomInt(0, 500)}/300/200`} width="100%" />
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {result.price?.raw} TL
                </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
                <Typography>
                    {result.category?.raw}
                </Typography>
            </Grid>
        </Grid>
    };

    console.log(elasticConfig.facets);

    return <Grid container spacing={2}>
        <SearchProvider config={elasticConfig}>
            <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
                {(props) => {
                    const { wasSearched } = props;
                    return (
                        <ErrorBoundary>
                            <Grid item xs={12}>
                                <Layout
                                    sideContent={
                                        <div>
                                            {/* {wasSearched && (
                                                <Sorting
                                                    label={"Sort by"}
                                                    sortOptions={buildSortOptionsFromConfig()}
                                                />
                                            )} */}
                                            {elasticConfig.facets.map((field: any) => (
                                                <Facet
                                                    filterType="any"
                                                    view={MultiCheckboxFacet}
                                                    key={field}
                                                    field={field}
                                                    label={facetTitleMapping[field as keyof typeof facetTitleMapping]}
                                                />
                                            ))}
                                        </div>
                                    }
                                    bodyContent={
                                        <Results
                                            view={CustomResultsView}
                                            resultView={CustomResultView}
                                        />
                                    }
                                    bodyHeader={
                                        <React.Fragment>
                                            {wasSearched && <PagingInfo />}
                                            {wasSearched && <ResultsPerPage />}
                                        </React.Fragment>
                                    }
                                    bodyFooter={<Paging />}
                                />
                            </Grid>
                        </ErrorBoundary>
                    );
                }}
            </WithSearch>
        </SearchProvider>
    </Grid>
}