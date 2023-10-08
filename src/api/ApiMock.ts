import type {ProductListResponse , productsListRow , ApiClient} from './ApiTypes' 

export const productListResponse: ProductListResponse = {
    records : [
        {
            productId : 1,
            productName : "Cheese burger",
            productImage : "items/beef/Whopper.webp",
            productCategory : "beef",
            ingredientsCount : 6,
            modifiersCount : 5 ,
            isFinal : false , 
            productDescription : "Melon cheese burger" 
        },
        {
            productId : 2,
            productName : "whopper tripple burger",
            productImage : "items/beef/BBQ Bacon Whopper Jr..webp",
            productCategory : "burger",
            ingredientsCount : 8,
            modifiersCount : 4,
            isFinal : false , 
            productDescription : "Melon whopper" 
        },
    ],
    deletedRecords : [],
    options : {
        title : 'Products List' ,
        description : 'Products Description',
        createHandler : { 
            title: 'Create',
            redirectRoute: 'products/create',
            routeName: 'products_create',
        },
        updateHandler : { 
            title: 'Update',
            redirectRoute: 'products/:id/update',
            routeName: 'products_update',
        },

    }
};

const apiClient: ApiClient = {
    productsList: async (): Promise<ProductListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return productListResponse;
    },
}

export default apiClient;
