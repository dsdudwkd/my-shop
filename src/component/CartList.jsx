import React from 'react';
import UseCart from '../context/UseCart';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { deleteCartItem } from '../api/firebase';

function CartList({ product, index }) {

    const { addItemCart, deleteItem } = UseCart();
    const setPrice = parseInt(product.price).toLocaleString();

    const plusItem = () => {
        addItemCart.mutate({ ...product, quantity: product.quantity + 1 })
    }
    const minusItem = () => {
        // if(product.quantity > 1){
        //     addItemCart.mutate({...product, quantity : product.quantity - 1})
        // } else if(product.quantity < 2){
        //     alert('상품의 갯수는 1 이상이어야 합니다');
        //     // addItemCart.mutate({...product, quantity : product.quantity})
        // }
        if (product.quantity < 2) {
            alert('상품의 갯수는 1 이상이어야 합니다');
            return
        }
        addItemCart.mutate({...product, quantity : product.quantity - 1})

    }

    const itemDelete = (p) => {
        deleteItem.mutate(product.id);
    }

    return (
        <li>
            <p>{index + 1}</p>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <p>{product.option}</p>
            <p>{setPrice}원</p>
            <AiOutlinePlus onClick={plusItem} />
            <p>수량 : {product.quantity} </p>
            <AiOutlineMinus onClick={minusItem} />
            <button onClick={()=> itemDelete(product.id)}>삭제</button>
        </li>
    );
}

export default CartList;

