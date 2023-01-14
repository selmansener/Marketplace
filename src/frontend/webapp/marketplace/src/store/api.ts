import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiV1AccountGet: build.query<
      GetApiV1AccountGetApiResponse,
      GetApiV1AccountGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Account/Get`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1AddressGetCities: build.query<
      GetApiV1AddressGetCitiesApiResponse,
      GetApiV1AddressGetCitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Address/GetCities`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1AddressGetDistrictsByCityCode: build.query<
      GetApiV1AddressGetDistrictsByCityCodeApiResponse,
      GetApiV1AddressGetDistrictsByCityCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Address/GetDistricts/${queryArg.cityCode}`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1BasketGet: build.query<
      GetApiV1BasketGetApiResponse,
      GetApiV1BasketGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Basket/Get`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postDevV1Seed: build.mutation<
      PostDevV1SeedApiResponse,
      PostDevV1SeedApiArg
    >({
      query: (queryArg) => ({
        url: `/dev/v1/Seed`,
        method: "POST",
        headers: { "X-ApiKey": queryArg["X-ApiKey"] },
        params: {
          seedServiceType: queryArg.seedServiceType,
          recreateDb: queryArg.recreateDb,
        },
      }),
    }),
    getDevV1GetClientIp: build.query<
      GetDevV1GetClientIpApiResponse,
      GetDevV1GetClientIpApiArg
    >({
      query: (queryArg) => ({
        url: `/dev/v1/GetClientIP`,
        headers: { "X-ApiKey": queryArg["X-ApiKey"] },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type GetApiV1AccountGetApiResponse = unknown;
export type GetApiV1AccountGetApiArg = {
  "api-version"?: string;
};
export type GetApiV1AddressGetCitiesApiResponse =
  /** status 200 Success */ City[];
export type GetApiV1AddressGetCitiesApiArg = {
  "api-version"?: string;
};
export type GetApiV1AddressGetDistrictsByCityCodeApiResponse =
  /** status 200 Success */ District[];
export type GetApiV1AddressGetDistrictsByCityCodeApiArg = {
  cityCode: string;
  "api-version"?: string;
};
export type GetApiV1BasketGetApiResponse = unknown;
export type GetApiV1BasketGetApiArg = {
  "api-version"?: string;
};
export type PostDevV1SeedApiResponse = unknown;
export type PostDevV1SeedApiArg = {
  seedServiceType?: SeedServiceType;
  recreateDb?: boolean;
  /** X-ApiKey */
  "X-ApiKey": string;
};
export type GetDevV1GetClientIpApiResponse = unknown;
export type GetDevV1GetClientIpApiArg = {
  /** X-ApiKey */
  "X-ApiKey": string;
};
export type City = {
  name?: string;
  code?: string;
};
export type District = {
  name?: string;
  code?: string;
  cityName?: string;
  cityCode?: string;
};
export type SeedServiceType =
  | "UsersCreatedEmpty"
  | "UsersCreated"
  | "Users"
  | "StylePreferences"
  | "Product"
  | "SalesOrders"
  | "Addresses";
export const {
  useGetApiV1AccountGetQuery,
  useGetApiV1AddressGetCitiesQuery,
  useGetApiV1AddressGetDistrictsByCityCodeQuery,
  useGetApiV1BasketGetQuery,
  usePostDevV1SeedMutation,
  useGetDevV1GetClientIpQuery,
} = injectedRtkApi;
