<template>
    <div class="content-text text-start w-full">
        <h1 class="font-bold text-3xl lg:text-6xl 2xl:text-8xl mb-8">Log in</h1>
        <div class="form">
            <UInput type="email" placeholder="Your Email..." color="iron" size="lg" class="mb-3" v-model="userInfo.mail" />
            <div class="flex items-center">
                <UInput type="password" required placeholder="Password" color="iron" variant="outline" size="xl" class="w-full mb-3" id="input" v-model="userInfo.pass" />
                <UButton size="lg" variant="none" class="text-gray-500 cursor-pointer -ml-10 -mt-3 hidden" id="showPass">
                    <template #leading>
                        <UIcon v-if="!showEye" name="i-heroicons-eye" />
                        <UIcon v-else name="i-heroicons-eye-slash" />
                    </template>
                </UButton>
            </div>
        </div>
        <p v-if="success" class="text-green-500 text-sm lg:text-md xl:text-lg 2xl:text-xl mb-3">Log in succesful</p>
        <UButton block label="Log in" color="yellow" size="xl" class="text-gray-700 font-semibold mt-3 mb-5 text-sm lg:text-md xl:text-lg 2xl:text-xl" @click="signin" />
        <UButton label="Forgot Password" color="iron" variant="ghost" class="text-semibold text-gray-500 mb-3 text-sm lg:text-md xl:text-lg 2xl:text-xl" />
        <UDivider label="or" class="text-gray-700 font-bold mb-5" />
        <div class="columns-2 mb-5">
            <UButton label="Google" color="iron" variant="solid" size="lg" block class="text-sm lg:text-md xl:text-lg 2xl:text-xl" />
            <UButton label="Facebook" color="iron" variant="solid" size="lg" block class="text-sm lg:text-md xl:text-lg 2xl:text-xl" />
        </div>
        <p class="font-semibold text-sm lg:text-md xl:text-lg 2xl:text-xl text-center mb-4">
            Don't have an account?
            <UButton to="/signup" :padded="false" label="Sign up" class="text-sm lg:text-md xl:text-lg 2xl:text-xl text-primary font-bold" color="gray" variant="none" />
        </p>
        <p class="text-red-700">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'startup'
})

import { signInWithEmailAndPassword } from 'firebase/auth'

const auth = useFirebaseAuth();
const router = useRouter();

const userInfo = ref({
    mail: '',
    pass: ''
})

const showEye = ref(false);
const success = ref(false);
const error = ref<string>()

const signin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, userInfo.value.mail, userInfo.value.pass);
        if (userCredential.user) {
            userInfo.value = {
                mail: '',
                pass: ''
            };
            success.value = true;
            setTimeout(() => {
                success.value = false;
                router.push('/today');
            }, 1500)
        }
    } catch (err) {
        console.log(err.code, err)
        switch (err.code) {
            case 'auth/invalid-email':
                error.value = "The provided value for the email user property is invalid. It must be a string email address."
                break;
            case 'auth/invalid-credential':
                error.value = "Please check again. Email or Password is wrong."
                break;
        }
    }
}

</script>