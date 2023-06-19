<template>
    <div id="centerCallToAction" class="mt-44">
        <div class="px-4 mx-auto text-center">
            <h1 class="text-4xl text-center text-black mb-3">
                <b>Light-it Test</b>
            </h1>
            <p class="pt-2 text-xl text-center text-gray-800">
                Login or Register to the app.
            </p>
        </div>
        <div class="mt-20"></div>
        <div class="flex justify-around">
            <router-link 
                class="py-2 w-32 bg-black text-center text-white rounded-lg"
                to="register"
            >
                Register
            </router-link>
            <router-link 
                class="p-2 w-32 bg-black text-center text-white rounded-lg"
                to="login"
            >
                Login
            </router-link>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
</style>