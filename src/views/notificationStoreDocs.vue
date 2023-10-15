<script setup lang="ts">
    
</script>
<template>
    <div>
        <h1 class="text-center">Notification Store</h1>
        <p class="w-10 m-auto text-lg text-center">The Notification Store is responsible for managing and displaying notifications
             in your Vue.js application. It utilizes Pinia, a state management library, and PrimeVue's useToast function to provide
              a centralized store for showing success and error notifications with internationalization support.
        </p>
        <div class="p-5">
            <h2>Usage</h2>
            <p>To utilize the Notification Store in your application, follow these steps:</p>
            <h4 class="text-lg mt-2">1. Import the useNotificationStore function from the store file :</h4>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">import { useNotificationStore } from '@/stores/notification';</h3>
            </div>
            <p class="text-lg mt-2">2. Access the store instance by invoking the <span class="text-white font-bold">useNotificationStore</span> function:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const notificationStore = useNotificationStore()</h3>
            </div>
            <p class="text-lg mt-2">3. Show a success notification using the showSuccess method:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">notificationStore.showSuccess('otp_email_sent' , 'otp_email_sent_detail')</h3>
                <p class="w-9">The <span class="text-white font-bold">`showSuccess`</span>method adds a success notification to the toast, where:
                </p>
                <p class="w-9 my-2"><span class="text-white font-bold">`'otp_email_sent'` : </span>  is the translation key for the notification summary.</p>
                <p class="w-9 my-2"><span class="text-white font-bold">`'otp_email_sent_detail'` : </span> is the translation key for the notification detail.
                </p>
                <p class="w-9 my-2">The `t` function from `useI18n` is used to translate the summary and detail messages.
                </p>
            </div>
            <p class="text-lg mt-2">4. Show an error notification using the showError method :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">notificationStore.showError('notification.errorSummary', 'notification.errorDetail')</h3>
                <p class="w-9">The <span class="text-white font-bold">`showError`</span> method adds an error notification to the toast, where:
                </p>
                <p class="w-9 my-2"><span class="text-white font-bold">`'notification.errorSummary'` : </span>  is the translation key for the notification summary.</p>
                <p class="w-9 my-2"><span class="text-white font-bold">`'notification.errorDetail'` : </span> is the translation key for the notification detail.
                </p>
                <p class="w-9 my-2">The `t` function from `useI18n` is used to translate the summary and detail messages.
                </p>
            </div>
            
            <h2 class="w-10 m-auto text-center">By utilizing the Notification Store, you can easily manage and display 
                success and error notifications in your Vue.js application. The store integrates with PrimeVue's toast 
                component and supports internationalization through the useI18n function.</h2>
        </div>
    </div>
</template>