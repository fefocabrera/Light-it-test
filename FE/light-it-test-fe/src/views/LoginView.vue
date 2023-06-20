<template>
    <div id="Login">
        <div class="w-full p-10 flex justify-center items-center">
            <div class="w-full max-w-lg">
                <div class="w-full text-center mb-9">
                    <h1 class="m-6 text-4xl"> Login</h1>
                </div>

                <div class="mb-5">
                    <TextInput 
                    label="Username"
                    placeholder="Username"
                    v-model:input="username"
                    inputType="text"
                />
                </div>
                <div class="mb-5">
                    <TextInput 
                    label="Password"
                    placeholder=""
                    v-model:input="password"
                    :minLength="8"
                    inputType="password"
                />
                </div>
                <button
                    class="block w-full bg-gray-800 text-white rounded-sm py-3 text-sm"
                    type="submit"
                    @click="login"
                    :disabled="disabled"
                >
                    Login
                </button>
                <span v-if="error" class="text-red-500">
                    {{ error }}
                </span>

                <p class="text-center text-gray-900 mt-3">
                    Don't have an account?
                    <router-link to="register" class="text-blue-500">
                        Register
                    </router-link>
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import TextInput from '../components/global/TextInput.vue'

    const router = useRouter()

    let error = ref(null)
    let username = ref(null)
    let password = ref(null)
    let disabled = ref(true)

    const checkFields = () => {
    disabled.value =
        !username.value ||
        !password.value
    };

    watch([username, password], checkFields, { immediate: true });

    const login = async () => {

        try {
            let res = await axios.post('api/login', {
                username: username.value,
                password: password.value,
            })
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data
            sessionStorage.setItem('token', 'Bearer ' + res.data);

            router.push('/evaluation')
        } catch (err) {
            error.value = err?.response?.data
        }
    }
</script>