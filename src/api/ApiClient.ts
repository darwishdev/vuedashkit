import { createConnectTransport } from "@bufbuild/connect-web";

import { createPromiseClient } from "@connectrpc/connect";
import type { PromiseClient, Transport } from "@connectrpc/connect";
import { RmsCoreService } from "@buf/ahmeddarwish_mln-rms-core.connectrpc_es/rms/v1/rms_core_service_connect"
import { type Interceptor } from "@connectrpc/connect";



const authorizationInterceptor: Interceptor = (next) => async (req) => {
    const token = localStorage.getItem("token") as string
    req.header.append("Authorization", `bearer ${token}`)
    return await next(req);
};


const dateParserInterceptor: Interceptor = (next) => async (req) => {
    try {
        const response = await next(req);
        const message = response.message as any
        const responseKeys = Object.keys(message)
        if (responseKeys.includes("records")) {
            message.records = message.records.map(r => {
                r.createdAt = r.createdAt?.toDate ? r.createdAt?.toDate() : r.createdAt
                r.deletedAt = r.deletedAt?.toDate ? r.deletedAt?.toDate() : r.deletedAt
                return r
            })
        }
        if (responseKeys.includes("deletedRecords")) {
            message.deletedRecords = message.deletedRecords.map(r => {
                r.createdAt = r.createdAt?.toDate ? r.createdAt?.toDate() : r.createdAt
                r.deletedAt = r.deletedAt?.toDate ? r.deletedAt?.toDate() : r.deletedAt
                return r
            })
        }
        return response
    } catch (error: any) {
        console.log(error)
        throw new Error('unhandeldError');
    }
};

const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_API_URL,
    useHttpGet: true,
    interceptors: [authorizationInterceptor, dateParserInterceptor]
});

const apiClient: PromiseClient<typeof RmsCoreService> = createPromiseClient(RmsCoreService, transport as Transport);



export default apiClient
