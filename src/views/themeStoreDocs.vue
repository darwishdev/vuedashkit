<script setup lang="ts">
    
</script>
<template>
    <div>
        <h1 class="text-center">Theme Store</h1>
        <p class="w-10 m-auto text-lg text-center">The Theme Store is responsible for managing theme-related operations and
            state in your Vue.js application. It utilizes Pinia, a state management library, to provide a centralized store
            for toggling themes, controlling menu visibility, and handling theme-specific functionality.
        </p>
        <div class="p-5">
            <h2>Usage</h2>
            <p>To utilize the Theme Store in your application, follow these steps:</p>
            <h4 class="text-lg mt-2">1. Import the useThemeStore function from the store file :</h4>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">import { useThemeStore } from '@/stores/theme';</h3>
            </div>
            <p class="text-lg mt-2">2. Access the store instance by invoking the <span class="text-white font-bold">useThemeStore</span> function:</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const themeStore = useThemeStore()</h3>
            </div>
            <p class="text-lg mt-2">3. Initialize the store state</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">themeStore.init()</h3>
                <p class="w-9">The <span class="text-white font-bold">`init`</span>method Initializes the store state by checking the stored theme and menu status and applying them if necessary.
                </p>
            </div>
            <p class="text-lg mt-2">4. Control the visibility of the progress bar using the startProgressBar and stopProgressBar methods :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">themeStore.startProgressBar()<br>
                    themeStore.stopProgressBar()</h3>
                    <p class="w-9"><span class="text-white font-bold">`startProgressBar()` : </span>  A method used to Start the progress bar and automatically stops it after a 2-second delay.</p>
                    <p class="w-9"><span class="text-white font-bold">`stopProgressBar()` : </span>  A method used to Stop the progress bar.</p>
            </div>
            <p class="text-lg mt-2">5. Toggle the visibility of the desktop menu using the toggleDesktopMenu method :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">themeStore.toggleDesktopMenu()</h3>
                <p>The <span class="text-white font-bold">`toggleDesktopMenu`</span> method toggles the lock of the 
                    desktop menu .. if it's locked , it unlocks the menu and updates the store state accordingly. It also stores the menu status in the local storage.
                </p>
            </div>
            <p class="text-lg mt-2">6. Change the theme using the changeTheme method :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">themeStore.changeTheme()</h3>
                <p>The <span class="text-white font-bold">`changeTheme`</span> method toggles the theme between light and 
                    dark modes. It updates the store state, adjusts the theme class on the `body` element, and stores the
                    theme preference in the local storage.
                </p>
            </div>
            <p class="text-lg mt-2">7. Access the store properties as needed :</p>
            <div class="p-3 my-3 bg-card">
                <h3 class="my-2">const isMenuOpened = themeStore.isMenuOpened <br>
                    const isDark = themeStore.isDark <br>
                    const isProgressBarVisible = themeStore.isProgressBarVisible
                </h3>
                <p class="w-9"><span class="text-white font-bold">`isMenuOpened` : </span> A reactive property that indicates whether the desktop menu is opened (locked) or closed.</p>
                <p class="w-9"><span class="text-white font-bold">`isDark` : </span>  A reactive property that indicates whether the dark theme is currently active.</p>
                <p class="w-9"><span class="text-white font-bold">`isProgressBarVisible` : </span>A reactive property that indicates whether the progress bar is visible.</p>

            </div>
            <h2 class="w-10 m-auto text-center">By utilizing the Theme Store, you can easily manage theme-related functionality
            in your Vue.js application, including toggling themes, controlling the visibility of the desktop menu, and handling
             theme-specific operations.</h2>
        </div>
    </div>
</template>