import type { FormKitPlugin } from '@formkit/core';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Table } from 'dexie'
import {
    db,
    type Icon,
    type InputOption,
    type InputOptionGroup
} from '@/db/db'

export const fetchOptionsPlugin: FormKitPlugin = (node) => {
    if ('customOptions' in node.props) {
        const apiClient = inject("apiClient") as any;
        const { params } = useRoute();
        const defaultRequestProperty = 'recordId';
        const { customOptions, lazyLoad, cacheKey, requestPropertyName, requestPropertyParamName, cacheTimeout, requestPropertyValue } = node.props
        // this map help methods to get the id and table of the database based on 
        //  if it's grouped input or not
        const dbTableMap: Record<string, Table<InputOptionGroup | InputOption>> = {
            'true': db.inputOptionGroups,
            'false': db.inputOptions
        }
        const handleSuccessResponse = async (res: any) => {
            node.props.options = 'options' in res ? res.options : res;
            if (cacheKey) {
                await writeCache(node.props.options)
            }
            node.props.loading = false;

        };

        const getOptionsStr = async (optionsKey: string) => {
            const apiFunc = apiClient[optionsKey];
            getOptionsFunc(apiFunc);
        };

        const getOptionsFunc = async (optionsFunc: Function) => {
            const req = {};
            if (requestPropertyName || requestPropertyParamName || requestPropertyValue) {
                const propertyName = requestPropertyName ? requestPropertyName : defaultRequestProperty;
                const value = requestPropertyParamName ? params[requestPropertyParamName] : requestPropertyValue;
                req[propertyName] = value;
            }

            const funcOptions = await optionsFunc(req);
            await handleSuccessResponse(funcOptions);
        };

        const getOptionsArray = async (optionsArray: any[]) => {
            await handleSuccessResponse(optionsArray);
        };


        const getExpiryByPeriod = (hours: number): Date => {
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + hours); // Set expiration to two hours from now
            return expirationDate
        }
        const cacheObjectMapped = (options: any[]) => options.map(option => {
            option.inputName = cacheKey
            option.createdAt = new Date()
            const cacheTimeoutInHours = cacheTimeout ? cacheTimeout : 48
            option.expiredAt = getExpiryByPeriod(cacheTimeoutInHours)
            return option
        })


        const writeCache = async (options: any) => {
            const isGroupTable = node.props.hasGroup ? 'true' : 'false'
            const dbTable: Table<InputOptionGroup | InputOption> = dbTableMap[isGroupTable]
            if (cacheKey) {
                const keysToDelete = (await dbTable.where('inputName').equals(cacheKey).toArray()).map(o => o['id'])
                await dbTable.bulkDelete(keysToDelete)
                await dbTable.bulkAdd(cacheObjectMapped(options))
            }
        }
        const isCacheValid = (expiredAt: Date): boolean => {
            return expiredAt > new Date()
        }

        const readCache = async () => {
            const isGroupTable = node.props.hasGroup ? 'true' : 'false'
            const dbTable: Table<InputOptionGroup | InputOption> = dbTableMap[isGroupTable]
            if (cacheKey) {
                const dbOptions = await dbTable.where('inputName').equals(cacheKey).toArray()
                if (dbOptions.length) {
                    if (isCacheValid(dbOptions[0].expiredAt)) {
                        node.props.options = dbOptions
                        return true
                    }
                    return false
                }
                return false
            }
            return false
        }

        const optionsGetterMap = {
            string: getOptionsStr,
            function: getOptionsFunc,
            array: getOptionsArray,
        };

        const loadOptionsFromType = () => {
            node.props.loading = true;
            const optionsType = typeof customOptions;
            console.log('optionsType', optionsType)
            if (optionsGetterMap[optionsType]) {
                optionsGetterMap[optionsType](customOptions);
            }
        };

        node.on('created', async () => {
            node.props.loadOptions = loadOptionsFromType
            node.props.readCache = readCache
            const isCacheFound = await node.props.readCache()
            if (isCacheFound) {
                return
            }
            if (!lazyLoad) {
                loadOptionsFromType();
            }
        });
    }
};
