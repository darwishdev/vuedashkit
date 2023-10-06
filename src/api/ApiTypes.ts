// import { ListDataOptions } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/client_definitions_pb';
export interface productsListRow {
    productId : number;
    productName: string;
    productDescription : string;
    productCategory : string;
    ingredientsCount : number;
    modifiersCount : number;
    isFinal : boolean;
}

export interface Handler{
    title: string;
    redirectRoute: string;
    routeName: string;
}

export interface ListDataOptions{
    title: string;
    description: string;
    createHandler?: Handler;
    updateHandler?: Handler;
    deleteRestoreHandler?: any;
    importHandler?: any;
}

export interface ProductListResponse {
    records : productsListRow[];
    deletedRecords: productsListRow[];
    options : ListDataOptions;
}

export interface ApiClient {
    productsList: () => Promise<ProductListResponse>
}