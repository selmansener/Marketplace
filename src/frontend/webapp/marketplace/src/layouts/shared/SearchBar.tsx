import { alpha, Grid, InputAdornment, InputBase, Link, List, ListItem, Menu, MenuItem, styled, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ErrorBoundary, Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, Sorting, WithSearch } from "@elastic/react-search-ui";
import { InputViewProps, Layout, MultiCheckboxFacet, ResultsViewProps, ResultViewProps } from "@elastic/react-search-ui-views";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { AutocompleteQueryConfig } from "@elastic/search-ui";
import { config } from "../../config/";

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


interface CustomAutoCompleteViewProps {
    autocompletedResults: any[];
}

function CustomAutoCompleteView(props: CustomAutoCompleteViewProps) {
    const { autocompletedResults } = props;
    const navigate = useNavigate();

    return <List>
        {autocompletedResults.map((result: any, i: any) => {
            return <ListItem key={i} sx={{
                ml: "0px !important"
            }} onClick={() => navigate(`/search?q=${result?.name?.raw}`)}>{result?.name?.raw}</ListItem>
        })}
    </List>
}

export function SearchBar() {
    const { searchKey, endpointBase, engineName } = config.elasticEngineConfig;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const connector = new AppSearchAPIConnector({
        searchKey,
        engineName,
        endpointBase,
    });

    const autoCompleteConfig: AutocompleteQueryConfig = {
        results: {
            resultsPerPage: 5,
            result_fields: {
                brand: { raw: {} },
                name: { raw: {} },
            },
            search_fields: {
                "name": {},
                "brand": {}
            }
        },
        suggestions: {
            // types: {
            //     popularQueries: {
            //         search_fields: {
            //             "query.suggest": {} // fields used to query
            //         },
            //         result_fields: {
            //             query: { // fields used for display
            //                 raw: {}
            //             }
            //         },
            //         index: "popular_queries",
            //         queryType: "results"
            //     }
            // },
            // size: 5
        }
    }

    const elasticConfig = {
        ...config.elasticEngineConfig,
        searchQuery: {
            disjunctiveFacets: ["category"],
            // facets: {},
            // facets: buildFacetConfigFromConfig(),
            // ...buildSearchOptionsFromConfig()
        },
        // autocompleteQuery: buildAutocompleteQueryConfig(),
        autocompleteQuery: autoCompleteConfig,
        apiConnector: connector,
        alwaysSearchOnInitialLoad: false,
        trackUrlState: false
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

    const AutoCompleteResults = styled("div")(({ theme }) => ({
        padding: 0,
        ml: 0
    }));

    return <SearchProvider config={elasticConfig}>
        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
            {(props) => {
                const { wasSearched } = props;
                return <ErrorBoundary>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} >
                            <SearchBox
                                inputProps={{
                                    placeholder: t("SearchBarPlaceHolder")
                                }}
                                autocompleteSuggestions={true}
                                autocompleteResults={true}
                                autocompleteMinimumCharacters={3}
                                // onSelectAutocomplete={(e: any) => { console.log(e) }}
                                onSubmit={(searchTerm) => {
                                    navigate(`/search?q=${searchTerm}`);
                                }}
                                autocompleteView={({ autocompletedResults }) => {
                                    return <AutoCompleteResults className="sui-search-box__autocomplete-container">
                                        <CustomAutoCompleteView autocompletedResults={autocompletedResults} />
                                    </AutoCompleteResults>
                                    // return  <CustomAutoCompleteView autocompletedResults={autocompletedResults} />
                                }}
                            />
                        </Grid>
                    </Grid>
                </ErrorBoundary>
            }}
        </WithSearch>
    </SearchProvider>
}