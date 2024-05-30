<template>
    <div class="content-text text-start w-full">
        <h1 class="font-bold text-4xl lg:text-6xl mb-8">Sign up</h1>
        <div class="form mb-5">
            <UInput type="email" required placeholder="Your Email..." color="iron" variant="outline" size="lg" class="mb-3" v-model="userInfo.mail" />
            <UInput type="password" required placeholder="Password" color="iron" variant="outline" size="lg" class="mb-3" v-model="userInfo.pass">
                <template #trailing>
                    <UButton icon="i-heroicons-eye" size="sm" variant="none" class="text-gray-500" />
                </template>
            </UInput>
            <UInput type="password" required placeholder="Re-enter password" color="iron" variant="outline" size="lg" class="mb-2" v-model="userInfo.repass">
                <template #trailing>
                    <UButton icon="i-heroicons-eye" size="sm" variant="none" class="text-gray-500" />
                </template>
            </UInput>
            <p v-if="mismatch" class="text-sm text-red-500 font-semibold">Password mismatch!</p>
        </div>
        <UButton block label="Sign up" color="yellow" size="xl" class="text-gray-700 font-semibold mb-5" @click="signup" />
        <p class="font-semibold text-sm text-center">
            Already have an account?
            <UButton to="/login" :padded="false" label="Sign in" class="text-sm text-primary font-bold" color="gray" variant="none" />
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'startup'
})

const userInfo = ref({
    mail: '',
    pass: '',
    repass: '',
});

const mismatch = ref(false);

import { createUserWithEmailAndPassword } from 'firebase/auth'
const auth = useFirebaseAuth();

const signup = async () => {
    if (userInfo.value.pass === userInfo.value.repass) {
        try {
            await createUserWithEmailAndPassword(auth, userInfo.value.mail, userInfo.value.pass);
            const user = useCurrentUser();
            console.log(user);
        } catch (error) {
            console.log(error)
        }
    } else {
        userInfo.value.pass = '';
        userInfo.value.repass = '';
        mismatch.value = true;
        setTimeout(() => {
            mismatch.value = false;
        }, 1000);
    }
}

</script>