<template>
    <div class="content-text text-start w-full">
        <h1 class="font-bold text-3xl lg:text-6xl 2xl:text-8xl mb-8">Sign up</h1>
        <div class="form mb-5">
            <UInput type="email" required placeholder="Your Email..." color="iron" variant="outline" size="xl" class="mb-3" v-model="userInfo.mail" />
            <div class="flex items-center">
                <UInput type="password" required placeholder="Password" color="iron" variant="outline" size="xl" class="w-full mb-3" id="input-1" v-model="userInfo.pass" />
                <UButton size="lg" variant="none" class="text-gray-500 cursor-pointer -ml-10 -mt-3 hidden" id="showPass-1">
                    <template #leading>
                        <UIcon v-if="!showEye.no1" name="i-heroicons-eye" />
                        <UIcon v-else name="i-heroicons-eye-slash" />
                    </template>
                </UButton>
            </div>
            <div class="flex items-center">
                <UInput type="password" required placeholder="Re-enter password" color="iron" variant="outline" size="xl" class="w-full mb-2" id="input-2" v-model="userInfo.repass" />
                <UButton size="lg" variant="none" class="text-gray-500 cursor-pointer -ml-10 -mt-3 hidden" id="showPass-2">
                    <template #leading>
                        <UIcon v-if="!showEye.no2" name="i-heroicons-eye" />
                        <UIcon v-else name="i-heroicons-eye-slash" />
                    </template>
                </UButton>
            </div>
            <p v-if="mismatch" class="text-sm lg:text-md xl:text-lg 2xl:text-xl text-red-500 font-semibold">Password mismatch!</p>
        </div>
        <UButton block label="Sign up" color="yellow" size="xl" class="text-gray-700 font-semibold mb-5 text-sm lg:text-md xl:text-lg 2xl:text-xl" @click="signup" />
        <p class="font-semibold text-sm lg:text-md xl:text-lg 2xl:text-xl text-center">
            Already have an account?
            <UButton to="/login" :padded="false" label="Sign in" class="text-sm lg:text-md xl:text-lg 2xl:text-xl text-primary font-bold" color="gray" variant="none" />
        </p>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

definePageMeta({
    layout: 'startup'
})

const userInfo = ref({
    mail: '',
    pass: '',
    repass: '',
});

const showEye = ref({
    no1: false,
    no2: false
});

const mismatch = ref(false);

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { onMounted } from 'vue';
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

onMounted(() => {
    const showPass_1 = document.getElementById('showPass-1');
    const showPass_2 = document.getElementById('showPass-2');
    
    const input_1 = document.getElementById('input-1') as HTMLInputElement;
    const input_2 = document.getElementById('input-2') as HTMLInputElement;

    watch(() => userInfo.value.pass, () => {
        (userInfo.value.pass) ? showPass_1?.classList.remove('hidden') : showPass_1?.classList.add('hidden');
    })

    watch(() => userInfo.value.repass, () => {
        (userInfo.value.repass) ? showPass_2?.classList.remove('hidden') : showPass_2?.classList.add('hidden');
    })

    showPass_1?.addEventListener('click', () => {
        if (input_1.type === 'password') {
            input_1.type = 'text';
            showEye.value.no1 = true;
        } else {
            input_1.type = 'password';
            showEye.value.no1 = false;
        }
    })

    showPass_2?.addEventListener('click', () => {
        if (input_2.type === 'password') {
            input_2.type = 'text';
            showEye.value.no2 = true;
        } else {
            input_2.type = 'password';
            showEye.value.no2 = false;
        }
    })
    
})

</script>