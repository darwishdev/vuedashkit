import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";

import { RmsService } from "@buf/ahmeddarwish_mln-api.bufbuild_connect-es/rms/v1/rms_service_connect.js";
import { type Interceptor } from "@bufbuild/connect";
// import router from "../../router";

import { errorHandler } from './ApiErrors'
// const authorizationInterceptor: Interceptor = (next) => async (req) => {
//     const token = localStorage.getItem("token") as string
//     req.header.append("Authorization", `bearer ${token}`)
//     return await next(req);
// };


// const errorHandlerInterceptor: Interceptor = (next) => async (req) => {
//     try {
//         const response = await next(req);
//         return response
//     } catch (error: any) {
//         errorHandler[error.code || 503](error)
//         throw new Error('unhandeldError');

//     }
// };
const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_API_URL,
    // interceptors: [authorizationInterceptor, errorHandlerInterceptor]
});

const apiClient = createPromiseClient(RmsService, transport);
export default apiClient