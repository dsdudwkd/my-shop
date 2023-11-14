import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { getCart, updateCart } from "../api/firebase";

//아이디마다 장바구니 상태가 달라야함
export default function UseCart(){
    const {uid} = useAuthContext();
    const queryClient = useQueryClient();

    const cartInfo = useQuery(['cart', uid || ''], ()=> getCart(uid),{
        enabled : !!uid
    }); //cart라는 폴더와 uid or 빈 배열이 있으면 상품 정보를 넣는다
    console.log(uid)

    //useMutation() = 정보를 업데이트 할 때 사용하는 구문
    const addItemCart = useMutation(
        //각각의 아이디에 장바구니에 넣은 상품 정보를 넣을 것임
        (product) => updateCart(uid, product),
        {
            onSuccess : () => {
                queryClient.invalidateQueries(['cart', uid])
            }
        }
    )

    return {cartInfo, addItemCart}
}