import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseCart from '../context/UseCart';

function ProductDetail(props) {


    // useLocation() = 현재 url의 정보를 가져오는 리액트 DOM hook
    const state = useLocation().state;
    // console.log(state); //제품 정보
    const {addItemCart} = UseCart();
    const { id, title, image, price, option, description } = state;
    const setPrice = parseInt(price).toLocaleString();
    const setOpt = option.split(',').map(option => option.trim());
    const [success, setSuccess] = useState()

    const [selected, setSelected] = useState(setOpt && setOpt[0]); //옵션 정보가 있으면 옵션 정보의 배열 중 첫 번째를 선택하겠다
    const selectOpt = (e) => setSelected(e.target.value);

    const cartItem = () => {
        const product = {id, image, title, price, option:selected, quantity : 1}; //quantity = 수량 체크
        addItemCart.mutate(product,{
            onSuccess : () => {
                setSuccess('장바구니에 상품이 추가되었습니다.')
            }
        })
    }

    return (
        <div className='container'>
            <div className='detailPage'>
                <div className='detailImg'>
                    <img src={image} alt={title} />
                </div>

                <div className='detailText'>
                    <h2>{title}</h2>
                    <p>가격<span>{setPrice}</span></p>
                    <div className='detailOpt'>
                        <label className="lateText" htmlFor='optSelect'>옵션</label> {/* label태그의 for가 리액트에서는 htmlFor로 */}
                        <select id="optSelect" onChange={selectOpt} value={selected}>
                            {setOpt && setOpt.map((option, index) => ( /* 옵션이 있으면 index로 받아와서 옵션 정보를 가져와 */
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                    {/* 상품 설명 */}
                    <div className='text'>
                        <p>
                            {description}
                        </p>
                    </div>

                    {/* 장바구니 버튼 */}
                    <div className='detailBtns'>
                        <button className='cartBtn' onClick={cartItem}>장바구니 담기</button>
                        <button className='buyBtn'>구매하기</button>
                    </div>

                    {success && <p>{success}</p>}
                </div>


            </div>
        </div>
    );
}

export default ProductDetail;