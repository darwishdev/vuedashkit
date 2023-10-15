<script setup lang="ts">
    
</script>
<template>
    <div>
        <h1 class="text-center">Language Store</h1>
        <p class="w-10 m-auto text-lg text-center">The Language Store is responsible for managing language-related operations
            and state in your Vue.js application. It utilizes Pinia, a state management library, to provide a centralized
            store for toggling languages and handling language-related functionality.
        </p>
        <div class="p-5">
            <h2>Usage</h2>
            <p>To utilize the Language Store in your application, follow these steps:</p>
            <h4 class="text-lg mt-2">1. Import the useLanguageStore function from the store file :</h4>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">import { useLanguageStore } from '@/stores/language';</h3>
            </div>
            <p class="text-lg mt-2">2. Access the store instance by invoking the <span class="text-white font-bold">useLanguageStore</span> function:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const languageStore = useLanguageStore()</h3>
            </div>
            <p class="text-lg mt-2">3. Toggle the RTL mode and switch to the arabic language using the toggleRtl method :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">languageStore.toggleRtl()</h3>
                <p>The <span class="text-white font-bold">`toggleRtl`</span>  toggles the RTL (right-to-left) mode and switches 
                the language between English and Arabic. It updates the store state, sets the locale, and adjusts the configuration
                 for PrimeVue components and internationalization.
                </p>
            </div>
            <p class="text-lg mt-2">4. Access the store properties and methods as needed :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const isRtl = languageStore.isRtl <br>
                    const localeSetterComponentRef = languageStore.localeSetterComponentRef <br>
                    languageStore.init()
                    </h3>
                <p class="w-9"><span class="text-white font-bold">`isRtl` : </span>  A reactive property that indicates whether the RTL mode is enabled or not.
                </p>
                <p class="w-9"><span class="text-white font-bold">`init ()` : </span> Initializes the store state by checking the stored RTL mode value and applying it if necessary.
                </p>
            </div>
            <h2 class="w-10 m-auto text-center">By utilizing the Language Store, you can easily manage language-related functionality in your Vue.js application, including toggling the RTL mode and switching between languages.</h2>
        </div>
    </div>
</template>