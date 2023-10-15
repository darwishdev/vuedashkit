<script setup lang="ts">
    
</script>
<template>
    <div>
        <h1 class="text-center">Auth Store</h1>
        <p class="w-10 m-auto text-lg text-center">The Auth Store is responsible for managing authentication-related data and operations in your Vue.js 
            application. It utilizes Pinia, a state management library, to provide a centralized store for storing and 
            accessing login data.
        </p>
        <div class="p-5">
            <h2>Usage</h2>
            <p>To utilize the Auth Store in your application, follow these steps:</p>
            <h4 class="text-lg mt-2">1. Import the useAuthStore function from the store file :</h4>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">import { useAuthStore } from '@/stores/auth';</h3>
            </div>
            <p class="text-lg mt-2">2. Access the store instance by invoking the <span class="text-white font-bold">useAuthStore</span> function:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const authStore = useAuthStore()</h3>
            </div>
            <p class="text-lg mt-2">3. Save the login data using the saveLoginData method:</p>
            <div class="p-3 my-3 bg-card">
                <p>Assuming you have the login response stored in a variable called `response`</p>
                <h3 class="my-2">authStore.saveLoginData(response)</h3>
                <p>The <span class="text-white font-bold">`saveLoginData`</span> method automatically saves the token and user info in local storage and updates the store state with the login data.</p>
            </div>
            <p class="text-lg mt-2">4. Retrieve user data or sidebar information from the store :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const user = authStore.user <br>
                    const sidebar = authStore.sidebar</h3>
                <p class="w-9">The <span class="text-white font-bold">`user`</span> and  <span class="text-white font-bold">`sidebar`</span> properties provide access to the user information and sidebar data, respectively. These values are automatically retrieved from local storage if available.
                </p>
            </div>
            <p class="text-lg mt-2">5. Initialize the store state from local storage :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">authStore.init()</h3>
                <p class="w-9">The <span class="text-white font-bold">`init`</span>method retrieves the stored sidebar information from local storage and updates the store state accordingly.
                </p>
            </div>
            <h2 class="w-10 m-auto text-center">By utilizing the Auth Store, you can easily manage authentication-related data in your Vue.js application and access the user information and sidebar data whenever needed.</h2>
        </div>
    </div>
</template>