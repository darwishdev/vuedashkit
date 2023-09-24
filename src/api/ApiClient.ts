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


const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_API_URL,
    useHttpGet: true,
    interceptors: [authorizationInterceptor]
});

const apiClient: PromiseClient<typeof RmsCoreService> = createPromiseClient(RmsCoreService, transport as Transport);



export default apiClient
