import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { api, ProductExcelUploadDto, useGetApiV1ProductQueryUploadHistoryQuery } from "../../../store/api";
import { DataGrid, GridCellParams, GridColDef, GridSortModel, GridValueGetterParams } from '@mui/x-data-grid';
import { Pagination, QueryBuilder, SortDirection, SortField, StringFilter, StringFilterOperation } from "dynamic-query-builder-client";
import { useAppDispatch } from "../../../store/hooks";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function UploadHistory() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [queryString, setQueryString] = useState("");
    const { data: queryResult, error, isLoading, isFetching } = api.endpoints.getApiV1ProductQueryUploadHistory.useQueryState({
        dqb: queryString
    });
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: "createdAt",
            sort: "desc"
        }
    ]);

    const [data, setData] = useState<ProductExcelUploadDto[]>([]);

    useEffect(() => {
        var sortBy = sortModel.map(x => {
            return new SortField({
                property: x.field,
                by: x.sort == "asc" ? SortDirection.ASC : (x.sort === "desc" ? SortDirection.DESC : SortDirection.NONE)
            })
        });

        const queryBuilder = new QueryBuilder({
            filters: [],
            pagination: new Pagination({
                offset: currentPage * pageSize,
                count: pageSize,
            }),
            sortBy: sortBy,
        });

        var queryString = queryBuilder.build();
        setQueryString(queryString);

        dispatch(api.endpoints.getApiV1ProductQueryUploadHistory.initiate({
            dqb: queryString
        }));

    }, [currentPage, pageSize, sortModel]);

    useEffect(() => {
        if (queryResult?.data) {
            const { count, data } = queryResult.data;
            if (count) {
                setTotalCount(count);
            }

            if (data) {
                setData(data);
            }
        }
    }, [queryResult]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'originalFileName',
            headerName: 'File Name',
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return `${params.row.originalFileName}.${params.row.extension}`
            }
        },
        {
            field: 'fileSize',
            headerName: 'File Size',
            width: 250,
        },
        {
            field: 'createdAt',
            headerName: 'Upload Date',
            width: 250,
            valueGetter: (params: GridValueGetterParams) => {
                return format(new Date(params?.row.createdAt), 'dd.MM.yyyy', { locale: tr })
            }
        },
        {
            field: 'details',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridCellParams) => {
                return <Button onClick={() => {
                    navigate(`/dashboard/products/upload-history/${params.row.id}`);
                }}>
                    Details
                </Button>
            },
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.id;
            }
        }
    ];

    return <Grid item container spacing={2}>
        <Grid item xs={12}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    loading={isLoading || isFetching}
                    rowCount={totalCount}
                    rows={data}
                    columns={columns}
                    pageSize={pageSize}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                    paginationMode="server"
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    disableSelectionOnClick
                    sortModel={sortModel}
                    onSortModelChange={(model, details) => {
                        setSortModel(model);
                    }}
                />
            </Box>
        </Grid>
    </Grid>
}