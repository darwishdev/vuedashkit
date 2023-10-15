<script setup lang="ts">
    
</script>
<template>
    <div>
        <h1 class="text-center">Breadcrumb Store</h1>
        <p class="w-10 m-auto text-lg text-center">The Breadcrumb Store is responsible for managing and rendering 
            breadcrumbs in your Vue.js application. It utilizes Pinia, a state management library,
             and Vue Router's useRoute function to provide a centralized store for handling breadcrumbs
              with internationalization support.
        </p>
        <div class="p-5">
            <h2>Usage</h2>
            <p>To utilize the Notification Store in your application, follow these steps:</p>
            <h4 class="text-lg mt-2">1. Import the useBreadcrumbStore function from the store file :</h4>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">import { useBreadcrumbStore } from '@/stores/breadcrumb';</h3>
            </div>
            <p class="text-lg mt-2">2. Access the store instance by invoking the <span class="text-white font-bold">useBreadcrumbStore</span> function:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const breadcrumbStore = useBreadcrumbStore()</h3>
            </div>
            <p class="text-lg mt-2">3. Access the breadcrumb items through the breadcrumbs computed property:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const currentBreadcrumbs = breadcrumbStore.breadcrumbs</h3>
                <p class="w-9">The <span class="text-white font-bold">`breadcrumbs`</span>computed property returns an array 
                    of breadcrumb items. Each breadcrumb item is of type `MenuItem`, which is imported from `primevue/menuitem`
                    . The computed property automatically updates whenever the route's meta information changes.
                </p>
            </div>
            <p class="text-lg mt-2">4. Access the loading state of the breadcrumbs through the breadcrumbsLoading property:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const isBreadcrumbsLoading = breadcrumbStore.breadcrumbsLoading</h3>
                <p class="w-9">The <span class="text-white font-bold">`breadcrumbsLoading`</span>  property is a reactive reference 
                    to a boolean value that indicates whether the breadcrumbs are currently being loaded or not.
                </p>
            </div>
            
            <h3 class="w-10 m-auto text-center">By utilizing the Breadcrumb Store, you can easily manage and render 
                breadcrumbs in your Vue.js application. The store integrates with Vue Router's useRoute function and 
                supports internationalization through the useI18n function. Breadcrumbs can be accessed through the
                 breadcrumbs computed property, and the loading state and home breadcrumb item can be accessed through
                  the respective properties.
            </h3>
        </div>
    </div>
</template>