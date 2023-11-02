
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    /* 
    process.env = 환경 변수 Node.js의 전역 객체
    환경 변수 = 실행 중인 프로세스에 사용할 수 있고 애플리케이션을 구현할 수 있는 키-값으로 이루어진 변수
    - 외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩하지 ㅇ낳고 설정, 개인정보를 매개변수로 분리해서 관리하는 용도로 사용
    - process = 현재 Node.js의 프로세스의 전역 객체 실행 중인 프로세스에 접근해서 정보를 받아옴
    - .env = process에서 사용할 수 있는 모든 환경 변수를 포함하는 객체
    */

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();//구글 로그인 세팅
const auth = getAuth();

export async function login() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        return user;
    } catch(error) {
        console.log(error);
    }
}