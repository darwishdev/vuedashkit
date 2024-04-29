<script lang="ts" setup>
import { ref, computed, toRef, inject } from 'vue'
import type { InputImageProps, UploadHandler } from '@/types/types'
import Skeleton from 'primevue/skeleton';
import { useNotificationStore } from '@/stores/notification';
const props = defineProps<InputImageProps>();
const pathes = toRef(props.context.node._value as string)
const appImageElementRef = ref()
const uploading = ref(false)
const files = ref()
const notificationStore = useNotificationStore()

const uploadHandler: UploadHandler = inject('uploadHandler') as UploadHandler
const images = computed(() => {
    return pathes.value ? pathes.value.split(',') : []
})
type styleSizeObj = { minWidth: string, minHeight?: string }
const defailSizeObj: styleSizeObj = props.context.multiple ? { minWidth: '100%', minHeight: '150px' } : { minWidth: '150px', minHeight: '150px' }
const sizeObj: styleSizeObj | undefined = typeof props.context.size == 'undefined' ? defailSizeObj : typeof props.context.size === 'number' ?
    { minWidth: `${props.context.size}px`, minHeight: `${props.context.size}px` } :
    { minWidth: `${props.context.size.width}px`, minHeight: `${props.context.size.height}px` }

const handleUpload = async (evt: any) => {
    files.value = evt.target.files
    uploading.value = true
    let filePathes = ""
    for (let fileIndex = 0; fileIndex < evt.target.files.length; fileIndex++) {
        const file = evt.target.files[fileIndex];
        await uploadHandler.uploadEndpoint(file).then((f: string) => {
            filePathes = `${filePathes},${f}`
        }).catch((error: any) => {
            notificationStore.showError('upload_error', error.message)
            console.log(error, "error")
        }).finally(() => {

            setTimeout(() => uploading.value = false, 50)
        })
    }
    pathes.value = filePathes.substring(1)
    props.context.node._value = filePathes
    props.context.node.input(props.context.node._value)

}

</script>

<template>
    <div class="img-input" :style="sizeObj">
        <Skeleton v-show="uploading" :style="sizeObj" class="mr-2">
        </Skeleton>

        <div class="no-image" v-if="!uploading && images.length == 0">
            <app-image src="/initial/noimg.webp" :size="props.context.size">
            </app-image>
            <div class="upload" :style="`width : ${props.context.size || '150'}px`">
                <span>{{ $t('replace') }}</span>
            </div>
        </div>
        <div class="grid" v-if="!uploading && images.length > 0">
            <app-image v-for="path in images" class="mr-2" :src="path" :size="props.context.size" />
            <div class="upload w-full">
                <span>{{ $t('replace') }}</span>
            </div>
        </div>
        <input @change="handleUpload" :multiple="props.context.multiple" type="file" id="imageUpload"
            class="actual-input" accept="image/*">
    </div>
</template>


<style lang="scss">
.img-input {
    position: relative;
    padding: 20px;
    cursor: pointer;

    & .actual-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }



    & .upload {
        text-align: center;
        background-color: #fff;
        padding: 10px;
        border-radius: 0 0 6px 6px;
        transform: translateY(-10px);
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);

    }
}
</style>@/types/types