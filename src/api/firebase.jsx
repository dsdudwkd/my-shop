
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';
import { v4 as uuid } from 'uuid'; //고유 식별자를 생성해주는 패키지

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
const storage = getStorage(app);

export {storage};

//자동 로그인 현상 수정
provider.setCustomParameters({
    prompt: 'select_account',
})

//구글 로그인
export async function logIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        return user;
    } catch (error) {
        console.error(error);
    }
}

//구글 로그아웃
export async function logOut() {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
    }
}

//로그인 시 정보 계속 유지
export function onUserState(callback) {
    onAuthStateChanged(auth, async (user) => {
        // const updateUser = user;
        // callback(updateUser);
        if (user) {
            try {
                const updateUser = await adminUser(user);
                callback(updateUser);
            } catch (error) {
                console.error(error);
            }
        } else {
            callback(null);
        }
    })
}

//관리자 계정 관리
async function adminUser(user) {
    try {
        const snapShot = await get(ref(database, 'admin')); //firebase에 있는 database
        if (snapShot.exists()) {
            const admins = snapShot.val();
            const isAdmin = admins.includes(user.email);
            return { ...user, isAdmin }
        }
        return user;
    } catch (error) {
        console.error(error);
    }
}

//파이어베이스에 상품 정보 연동하기
export async function addProducts(product, image) {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        // price,
        image,
        //trim() = 문자열에 있는 공백 제거
        //join(',') = 분리된 문자를 다시 문자열인 쉼표로 구분하여 작성
        // option ,
        // title,
        // category
    }) //products라는 폴더가 알아서 만들어짐
}

//데이터베이스에 연동된 정보들 가져오기
//
export async function getProducts() {
    /* 
    - async = 비동기 방식의 데이터 처리 방법 (promise의 단점을 보완한 최신 비동기처리방식 코드)
    - return get(ref(database, 'products'))
    = 파이어베이스에 있는 실시간 데이터베이스의 product노드(경로)에 대한 참조와 함께 생성하고 읽기 작업을 시작하면 비동기로 호출받은 정보값을 반환
    - .then((snapshot) = snapshot은 내가 참조하고 있는 노드
    - snapshot이라는 매개변수명을 사용하는 이유는 특정 순간을 저장한 후에 결과와 비교해서 일치하는지 확인하는 테스트 단계
    */

    return get(ref(database, 'products')).then((snapshot) => {

        if (snapshot.exists()) { //snapshot에 접근한 노드에 데이터가 있는지 확인
            return Object.values(snapshot.val()); //데이터가 있으면 snapshot노드에 있는 객체들을 배열로 변환해서 반환
        }
        return [] //데이터가 없으면 빈 배열로 반환
    })
}

//장바구니에 저장된 요소들 업데이트하기
export async function updateCart(userId, product) {
    try {
        const cartRef = ref(database, `cart/${userId}/${product.id}`);
        await set(cartRef, product);
    } catch (error) {
        console.error(error);
    }
}

//유저 아이디를 가져와야 장바구니에 있는 정보를 가져옴
export async function getCart(userId) {
    try {
        const snapShot = await (get(ref(database, `cart/${userId}`)));
        // console.log(snapShot)
        if (snapShot.exists()) {
            const item = snapShot.val();
            // console.log(item)
            return Object.values(item);
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
}

//장바구니 삭제
export async function deleteCartItem(userId, productId) {
    console.log(userId, productId)
    return remove(ref(database, `cart/${userId}/${productId}`));
}

//데이터베이스에 등록한 상품 카테고리명 불러오기
export async function getCategory() {
    const database = getDatabase(); //db 가져오는 함수
    const categoryRef = ref(database, 'products'); //product폴더에 들어가야 상품들을 카테고리별로 나눌 수 있으므로

    try {
        const snapshot = await get(categoryRef);
        // console.log(categoryRef)
        if (snapshot.exists()) {
            // console.log(snapshot.val())
            return Object.values(snapshot.val());

        }
    } catch (error) {
        console.error(error);
    }
}

//데이터베이스에 있는 카테고리별 상품을 분류해서 불러오기
export async function getCategoryProduct(category) {
    return get(ref(database, 'products')).then((snapshot) => {
        if (snapshot.exists()) {
            const allProduct = Object.values(snapshot.val()); //먼저 모든 상품 정보를 받아온 후에 카테고리별로 필터링을 거치는 순서
            const filterProduct = allProduct.filter((product) => product.category === category);
            return filterProduct
        }
        return [];
    })
}

//상품 검색
export async function searchProduct(query) {

    try {
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef); // = await get(ref(database, 'products'))

        if (snapshot.exists()) {
            const data = snapshot.val();
            const allProduct = Object.values(data);

            if (allProduct.length === 0) { //모든 상품 정보가 하나도 없으면 빈 배열 반환
                return []
            }
            const matchItem = allProduct.filter((product) => {
                const itemTitle = product.title.toLowerCase(); //받아온 문자열이 영어면 소문자로 변환
                console.log(itemTitle); //상품 정보
                return itemTitle.includes(query.toLowerCase());
            })
            return matchItem;
        } else {
            return []
        }
    } catch (error) {
        console.error(error);
    }
}

//스토리지에서 사진 가져오기
export async function getStorageImg(imgPath) {
    const storage = getStorage();

    try {
        const imgRef = storageRef(storage, imgPath);
        const downloadURL = await getDownloadURL(imgRef);
        return downloadURL;
    }catch(error){
        console.error(error);
    }
}