
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {get, getDatabase, ref, set} from 'firebase/database';
import {v4 as uuid} from 'uuid'; //고유 식별자를 생성해주는 패키지

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
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();//구글 로그인 세팅
const auth = getAuth();
const database = getDatabase(app);

//자동 로그인 현상 수정
provider.setCustomParameters({
    prompt : 'select_account',
})

//구글 로그인
export async function logIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        return user;
    } catch(error) {
        console.error(error);
    }
}

//구글 로그아웃
export async function logOut(){
    try{
        await signOut(auth)
    } catch(error){
        console.error(error);
    }
}

//로그인 시 정보 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        // const updateUser = user;
        // callback(updateUser);
        if(user){
            try{
                const updateUser = await adminUser(user);
                callback(updateUser);
            }catch(error){
                console.error(error);
            }
        } else {
            callback(null);
        }
    })
}

//관리자 계정 관리
async function adminUser(user){
    try{
        const snapShot = await get(ref(database, 'admin')); //firebase에 있는 database
        if(snapShot.exists()){
            const admins = snapShot.val();
            const isAdmin = admins.includes(user.email);
            return{...user, isAdmin}
        }
        return user;
    }catch(error){
        console.error(error);
    }
}

//파이어베이스에 상품 정보 연동하기
export async function addProducts(product, image){
    const id = uuid();
    return set(ref(database, `products/${id}`),{
        ...product,
        id,
        // price,
        // image,
        // option,
        // title,
        // category
    }) //products라는 폴더가 알아서 만들어짐
}