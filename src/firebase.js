import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 環境変数が未設定のままビルドされると、Firestore の書き込みが完了せず処理が止まるため検知する
export const missingFirebaseEnv = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

if (missingFirebaseEnv.length > 0) {
    console.error(
        `Firebase の設定が見つかりません: ${missingFirebaseEnv.join(', ')}。` +
        'ビルド時に VITE_FIREBASE_* の環境変数を設定してください。'
    );
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
