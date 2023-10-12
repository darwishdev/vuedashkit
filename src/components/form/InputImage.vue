<script lang="ts" setup>
import { ref, toRef } from 'vue'
import supabase from '@/api/Supabase'
import type { InputImageProps } from '@/types/newtypes'
import Skeleton from 'primevue/skeleton';
import { useNotificationStore } from '@/stores/notification';
const props = defineProps<InputImageProps>();
const path = toRef(props.context.node._value)
const appImageElementRef = ref()
const uploading = ref(false)
const files = ref()
const notificationStore = useNotificationStore()


type styleSizeObj = { minWidth: string, minHeight?: string }
const defailSizeObj: styleSizeObj = { minWidth: '150px', minHeight: '150px' }
const sizeObj: styleSizeObj | undefined = typeof props.context.size == 'undefined' ? defailSizeObj : typeof props.context.size === 'number' ?
    { minWidth: `${props.context.size}px`, minHeight: `${props.context.size}px` } :
    { minWidth: `${props.context.size.width}px`, minHeight: `${props.context.size.height}px` }

const uploadAvatar = async (evt) => {
    files.value = evt.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.')
        }
        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`
        let { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
        if (uploadError) throw uploadError
        appImageElementRef.value.update(filePath)
        path.value = filePath
        props.context.node._value = filePath
        props.context.node.input(props.context.node._value)
    } catch (error: any) {
        notificationStore.showError('upload_error', error.message)
    } finally {
        setTimeout(() => uploading.value = false, 10)
    }
}

</script>

<template>
    <div class="img-input" :style="sizeObj">
        <Skeleton v-show="uploading" :style="sizeObj" class="mr-2">
        </Skeleton>
        <app-image v-show="!uploading" ref="appImageElementRef" :src="path" :size="props.context.size" />
        <div class="upload">
            <span>{{ $t('replace') }}</span>
        </div>
        <input @change="uploadAvatar" type="file" id="imageUpload" class="actual-input" accept="image/*">
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
</style>