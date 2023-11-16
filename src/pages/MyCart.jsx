import React from 'react';
import UseCart from '../context/UseCart';
import CartList from '../component/CartList';

function MyCart(props) {

    const { cartInfo: { data: products } } = UseCart();
    const isItem = products && products.length > 0;
    // console.log(products)

    const delivery = Number(3000).toLocaleString();
    // const delivery = 3000;
    const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0).toLocaleString();
    
    /* 
    prev = 초기값
    current = 현재 처리 중인 아이템들의 목록을 받아오며 최종적으로 prev에 담아오는 역할
    reduce() = 배열에 들어있는 값을 반환하는 hook
    이 작업을 reduce로 배열에서 반복하며, 배열을 업데이트 하는 방식
    */
    return (
        <div className='container'>
            <h2>장바구니 리스트</h2>
            {!isItem && <p>장바구니에 상품이 없습니다</p>}
            {isItem && (
                <ul className="cartList">
                    {products && products.map((product, index) => (
                        <CartList key={product.id} product={product} index={index} />
                    ))}
                </ul>
            )}
            <div className='priceWrap'>
                <p>{totalPrice}원</p>
                <p>배송비 : {delivery}</p>
                <p>총 주문 금액 : {totalPrice && delivery && (parseInt(totalPrice.replace(',','')) + parseInt(delivery.replace(',',''))).toLocaleString()}</p>
                {/* <p>총 주문 금액 : {totalPrice + delivery}</p> */}
            </div>
        </div>
    );
}

export default MyCart;