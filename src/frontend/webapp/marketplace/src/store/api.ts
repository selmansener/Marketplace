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
    getApiV1BillingAddressGetAll: build.query<
      GetApiV1BillingAddressGetAllApiResponse,
      GetApiV1BillingAddressGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/BillingAddress/GetAll`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1BillingAddressByBillingAddressId: build.query<
      GetApiV1BillingAddressByBillingAddressIdApiResponse,
      GetApiV1BillingAddressByBillingAddressIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/BillingAddress/${queryArg.billingAddressId}`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1BillingAddressCreate: build.mutation<
      PostApiV1BillingAddressCreateApiResponse,
      PostApiV1BillingAddressCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/BillingAddress/Create`,
        method: "POST",
        body: queryArg.createBillingAddress,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1BillingAddressByBillingAddressIdUpdate: build.mutation<
      PostApiV1BillingAddressByBillingAddressIdUpdateApiResponse,
      PostApiV1BillingAddressByBillingAddressIdUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/BillingAddress/${queryArg.billingAddressId}/Update`,
        method: "POST",
        body: queryArg.updateBillingAddress,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1BillingAddressByBillingAddressIdDelete: build.mutation<
      PostApiV1BillingAddressByBillingAddressIdDeleteApiResponse,
      PostApiV1BillingAddressByBillingAddressIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/BillingAddress/${queryArg.billingAddressId}/Delete`,
        method: "POST",
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1DeliveryAddressGetAll: build.query<
      GetApiV1DeliveryAddressGetAllApiResponse,
      GetApiV1DeliveryAddressGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/DeliveryAddress/GetAll`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1DeliveryAddressByDeliveryAddressId: build.query<
      GetApiV1DeliveryAddressByDeliveryAddressIdApiResponse,
      GetApiV1DeliveryAddressByDeliveryAddressIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/DeliveryAddress/${queryArg.deliveryAddressId}`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1DeliveryAddressCreate: build.mutation<
      PostApiV1DeliveryAddressCreateApiResponse,
      PostApiV1DeliveryAddressCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/DeliveryAddress/Create`,
        method: "POST",
        body: queryArg.createDeliveryAddress,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1DeliveryAddressByDeliveryAddressIdUpdate: build.mutation<
      PostApiV1DeliveryAddressByDeliveryAddressIdUpdateApiResponse,
      PostApiV1DeliveryAddressByDeliveryAddressIdUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/DeliveryAddress/${queryArg.deliveryAddressId}/Update`,
        method: "POST",
        body: queryArg.updateDeliveryAddress,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1DeliveryAddressByDeliveryAddressIdDelete: build.mutation<
      PostApiV1DeliveryAddressByDeliveryAddressIdDeleteApiResponse,
      PostApiV1DeliveryAddressByDeliveryAddressIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/DeliveryAddress/${queryArg.deliveryAddressId}/Delete`,
        method: "POST",
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
    getApiV1PaymentMethodGetAll: build.query<
      GetApiV1PaymentMethodGetAllApiResponse,
      GetApiV1PaymentMethodGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/PaymentMethod/GetAll`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    getApiV1PaymentMethodByPaymentMethodId: build.query<
      GetApiV1PaymentMethodByPaymentMethodIdApiResponse,
      GetApiV1PaymentMethodByPaymentMethodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/PaymentMethod/${queryArg.paymentMethodId}`,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1PaymentMethodCreate: build.mutation<
      PostApiV1PaymentMethodCreateApiResponse,
      PostApiV1PaymentMethodCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/PaymentMethod/Create`,
        method: "POST",
        body: queryArg.createPaymentMethod,
        params: { "api-version": queryArg["api-version"] },
      }),
    }),
    postApiV1PaymentMethodByPaymentMethodIdDelete: build.mutation<
      PostApiV1PaymentMethodByPaymentMethodIdDeleteApiResponse,
      PostApiV1PaymentMethodByPaymentMethodIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/PaymentMethod/${queryArg.paymentMethodId}/Delete`,
        method: "POST",
        params: { "api-version": queryArg["api-version"] },
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
export type GetApiV1BillingAddressGetAllApiResponse =
  /** status 200 Success */ BillingAddressDtoiEnumerableResponseModel;
export type GetApiV1BillingAddressGetAllApiArg = {
  "api-version"?: string;
};
export type GetApiV1BillingAddressByBillingAddressIdApiResponse =
  /** status 200 Success */ BillingAddressDtoResponseModel;
export type GetApiV1BillingAddressByBillingAddressIdApiArg = {
  billingAddressId: number;
  "api-version"?: string;
};
export type PostApiV1BillingAddressCreateApiResponse = unknown;
export type PostApiV1BillingAddressCreateApiArg = {
  "api-version"?: string;
  createBillingAddress: CreateBillingAddress;
};
export type PostApiV1BillingAddressByBillingAddressIdUpdateApiResponse =
  unknown;
export type PostApiV1BillingAddressByBillingAddressIdUpdateApiArg = {
  billingAddressId: number;
  "api-version"?: string;
  updateBillingAddress: UpdateBillingAddress;
};
export type PostApiV1BillingAddressByBillingAddressIdDeleteApiResponse =
  unknown;
export type PostApiV1BillingAddressByBillingAddressIdDeleteApiArg = {
  billingAddressId: number;
  "api-version"?: string;
};
export type GetApiV1DeliveryAddressGetAllApiResponse =
  /** status 200 Success */ DeliveryAddressDtoiEnumerableResponseModel;
export type GetApiV1DeliveryAddressGetAllApiArg = {
  "api-version"?: string;
};
export type GetApiV1DeliveryAddressByDeliveryAddressIdApiResponse =
  /** status 200 Success */ DeliveryAddressDtoResponseModel;
export type GetApiV1DeliveryAddressByDeliveryAddressIdApiArg = {
  deliveryAddressId: number;
  "api-version"?: string;
};
export type PostApiV1DeliveryAddressCreateApiResponse = unknown;
export type PostApiV1DeliveryAddressCreateApiArg = {
  "api-version"?: string;
  createDeliveryAddress: CreateDeliveryAddress;
};
export type PostApiV1DeliveryAddressByDeliveryAddressIdUpdateApiResponse =
  unknown;
export type PostApiV1DeliveryAddressByDeliveryAddressIdUpdateApiArg = {
  deliveryAddressId: number;
  "api-version"?: string;
  updateDeliveryAddress: UpdateDeliveryAddress;
};
export type PostApiV1DeliveryAddressByDeliveryAddressIdDeleteApiResponse =
  unknown;
export type PostApiV1DeliveryAddressByDeliveryAddressIdDeleteApiArg = {
  deliveryAddressId: number;
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
export type GetApiV1PaymentMethodGetAllApiResponse =
  /** status 200 Success */ PaymentMethodDtoiEnumerableResponseModel;
export type GetApiV1PaymentMethodGetAllApiArg = {
  "api-version"?: string;
};
export type GetApiV1PaymentMethodByPaymentMethodIdApiResponse =
  /** status 200 Success */ PaymentMethodDtoResponseModel;
export type GetApiV1PaymentMethodByPaymentMethodIdApiArg = {
  paymentMethodId: number;
  "api-version"?: string;
};
export type PostApiV1PaymentMethodCreateApiResponse = unknown;
export type PostApiV1PaymentMethodCreateApiArg = {
  "api-version"?: string;
  createPaymentMethod: CreatePaymentMethod;
};
export type PostApiV1PaymentMethodByPaymentMethodIdDeleteApiResponse = unknown;
export type PostApiV1PaymentMethodByPaymentMethodIdDeleteApiArg = {
  paymentMethodId: number;
  "api-version"?: string;
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
export type BillingType = "None" | "Individual" | "Corporate";
export type AddressDto = {
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  fullAddress?: string;
};
export type BillingAddressDto = {
  id?: number;
  type?: BillingType;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  tckn?: string | null;
  taxNumber?: string | null;
  taxOffice?: string | null;
  details?: AddressDto;
};
export type BillingAddressDtoiEnumerableResponseModel = {
  statusCode?: number;
  data?: BillingAddressDto[] | null;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type BillingAddressDtoResponseModel = {
  statusCode?: number;
  data?: BillingAddressDto;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type CreateBillingAddress = {
  type?: BillingType;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  tckn?: string | null;
  taxNumber?: string | null;
  taxOffice?: string | null;
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  fullAddress?: string;
};
export type UpdateBillingAddress = {
  name?: string;
  type?: BillingType;
  fullName?: string;
  phone?: string;
  email?: string;
  tckn?: string | null;
  taxNumber?: string | null;
  taxOffice?: string | null;
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  fullAddress?: string;
};
export type DeliveryAddressDto = {
  id?: number;
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string | null;
  details?: AddressDto;
};
export type DeliveryAddressDtoiEnumerableResponseModel = {
  statusCode?: number;
  data?: DeliveryAddressDto[] | null;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type DeliveryAddressDtoResponseModel = {
  statusCode?: number;
  data?: DeliveryAddressDto;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type CreateDeliveryAddress = {
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string | null;
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  fullAddress?: string;
};
export type UpdateDeliveryAddress = {
  name?: string;
  fullName?: string;
  phone?: string;
  email?: string | null;
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  fullAddress?: string;
};
export type SeedServiceType =
  | "Users"
  | "Product"
  | "SalesOrders"
  | "Addresses"
  | "PaymentMethods";
export type PaymentMethodDto = {
  id?: number;
  cardAssociation?: string;
  cardFamily?: string;
  cardBankName?: string;
  cardBankCode?: number | null;
  binNumber?: string;
  cardName?: string;
};
export type PaymentMethodDtoiEnumerableResponseModel = {
  statusCode?: number;
  data?: PaymentMethodDto[] | null;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type PaymentMethodDtoResponseModel = {
  statusCode?: number;
  data?: PaymentMethodDto;
  message?: string | null;
  errorType?: string | null;
  errors?: {
    [key: string]: string[];
  } | null;
};
export type CreatePaymentMethod = {
  cardName?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expireMonth?: string;
  expireYear?: string;
};
export const {
  useGetApiV1AccountGetQuery,
  useGetApiV1AddressGetCitiesQuery,
  useGetApiV1AddressGetDistrictsByCityCodeQuery,
  useGetApiV1BasketGetQuery,
  useGetApiV1BillingAddressGetAllQuery,
  useGetApiV1BillingAddressByBillingAddressIdQuery,
  usePostApiV1BillingAddressCreateMutation,
  usePostApiV1BillingAddressByBillingAddressIdUpdateMutation,
  usePostApiV1BillingAddressByBillingAddressIdDeleteMutation,
  useGetApiV1DeliveryAddressGetAllQuery,
  useGetApiV1DeliveryAddressByDeliveryAddressIdQuery,
  usePostApiV1DeliveryAddressCreateMutation,
  usePostApiV1DeliveryAddressByDeliveryAddressIdUpdateMutation,
  usePostApiV1DeliveryAddressByDeliveryAddressIdDeleteMutation,
  usePostDevV1SeedMutation,
  useGetDevV1GetClientIpQuery,
  useGetApiV1PaymentMethodGetAllQuery,
  useGetApiV1PaymentMethodByPaymentMethodIdQuery,
  usePostApiV1PaymentMethodCreateMutation,
  usePostApiV1PaymentMethodByPaymentMethodIdDeleteMutation,
} = injectedRtkApi;
