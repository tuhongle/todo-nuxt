import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth'

const apps = getApps();

import * as serviceAccount from '@/todo.json'

if (!apps.length)
initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const email = body.email

    try {
        const user = await getAuth().getUserByEmail(email)
        return user
    } catch (err) {
        console.log(err)
        return err
    }
})


