export interface EnvConfig {
    socialMediaLinks: {
        instagram: string;
        facebook: string;
        twitter: string;
        linkedIn: string;
    },
    elasticEngineConfig: ElasticSearchEngineConfig;
}

export interface ElasticSearchEngineConfig {
    engineName: string;
    endpointBase: string;
    searchKey: string;
    resultFields: string[];
    sortFields: string[];
    facets: string[];
    titleField: string;
}

export const config: EnvConfig = {
    socialMediaLinks: {
        instagram: "https://www.instagram.com/modilistcom/",
        facebook: "https://www.facebook.com/modilistcom",
        twitter: "https://twitter.com/modilistcom",
        linkedIn: "https://www.linkedin.com/company/modilist/"
    },
    elasticEngineConfig: {
        "engineName": "products-engine",
        "endpointBase": "http://localhost:3002",
        "searchKey": "search-g7yf2vce5vp8ro65wzfoqpbw",
        "resultFields": [
          "barcode",
          "brand",
          "category",
          "colors",
          "details.collorType",
          "details.dressHeight",
          "details.id",
          "details.legType",
          "details.productId",
          "details.skirtHeight",
          "details.waistHeight",
          "gender",
          "name",
          "price",
          "sKU",
          "id"
        ],
        "sortFields": [
          "price"
        ],
        "facets": [
          "brand",
          "category",
          "colors",
          "details.collorType",
          "details.dressHeight",
          "details.legType",
          "details.skirtHeight",
          "details.waistHeight",
          "gender"
        ],
        "titleField": "name"
      }      
};