import { createConnectTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import type { PromiseClient, Transport } from "@connectrpc/connect";
import { RmsCoreService } from "@buf/ahmeddarwish_mln-rms-core.connectrpc_es/rms/v1/rms_core_service_connect"
import { type Interceptor } from "@connectrpc/connect";
import type { ApiFormError } from "@/types/types";

const interceptor: Interceptor = (next) => async (req) => {
    try {
        const token = localStorage.getItem("token") as string
        req.header.append("Authorization", `bearer ${token}`)
        const response = await next(req);
        return response
    } catch (error: any) {
        const err: ApiFormError = {
            globalErrors: [],
            fieldErrors: {}
        }
        if (error.code == 6) {
            err.fieldErrors[error.rawMessage] = `${error.rawMessage}Unique`
            console.log("field error")
            throw new Error(JSON.stringify(err));
        }
        err.fieldErrors[0] = 'unhandled'
        throw new Error(JSON.stringify(err));
    }
}

const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_API_URL,
    useHttpGet: true,
    interceptors: [interceptor]
});

const apiClient: PromiseClient<typeof RmsCoreService> = createPromiseClient(RmsCoreService, transport as Transport);



export default apiClient
