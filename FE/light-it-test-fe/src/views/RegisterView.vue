<template>
    <div id="Register">
        <div class="w-full p-10 flex justify-center items-center">
            <div class="w-full max-w-lg">
                <div class="w-full text-center mb-9">
                    <h1 class="m-6 text-4xl"> Register</h1>
                </div>

                <div class="mb-5">
                    <TextInput 
                    label="First Name"
                    placeholder="Firstname"
                    v-model:input="firstName"
                    inputType="text"
                />
                </div>
                <div class="mb-5">
                    <TextInput 
                    label="Last Name"
                    placeholder="Lastname"
                    v-model:input="lastName"
                    inputType="text"
                />
                </div>
                <div class="mb-5">
                    <DropdownInput 
                    label="Gender"
                    :options="genderOptions"
                    v-model:input="gender"
                />
                </div>
                <div class="mb-5">
                    <TextInput 
                    label="Birthdate"
                    placeholder="birthdate"
                    v-model:input="birthdate"
                    inputType="date"
                />
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
                    :minLength="8"
                    placeholder=""
                    v-model:input="password"
                    inputType="password"
                />
                </div>
                <div class="mb-5">
                    <TextInput 
                    label="Repeat Password"
                    :minLength="8"
                    placeholder=""
                    v-model:input="repeatPassword"
                    inputType="password"
                />
                </div>

                <button
                    class="block w-full bg-gray-800 text-white rounded-sm py-3 text-sm"
                    type="submit"
                    @click="register"
                    :disabled="disabled"
                >
                    Register
                </button>
                <span v-if="error" class="text-red-500">
                    {{ error }}
                </span>

                <p class="text-center text-gray-900 mt-3">
                    Already have an account?
                    <router-link to="login" class="text-blue-500">
                        Login
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
    import DropdownInput from '../components/global/DropdownInput.vue'

    const router = useRouter()

    let error = ref(null)
    let firstName = ref(null)
    let lastName = ref(null)
    let gender = ref(null)
    let birthdate = ref(null)
    let username = ref(null)
    let password = ref(null)
    let repeatPassword = ref(null)
    let disabled = ref(true);

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]

    const checkFields = () => {
    disabled.value =
        !firstName.value ||
        !lastName.value ||
        !gender.value ||
        !birthdate.value ||
        !username.value ||
        !password.value ||
        !repeatPassword.value
    };

    watch([firstName, lastName, gender, birthdate, username, password, repeatPassword], checkFields, { immediate: true });


    const register = async () => {
        if(password.value !== repeatPassword.value){
            disabled.value = true;
            error.value = "Password and Repeat Password are different."
        } else{
            try {
                let res = await axios.post('api/register', {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    gender: gender.value,
                    birthdate: birthdate.value,
                    username: username.value,
                    password: password.value,
                    repeatPassword: repeatPassword.value
                })
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data

                router.push('/evaluation')
            } catch (err) {
                error.value = err?.response?.data
            }
        }
    }
</script>