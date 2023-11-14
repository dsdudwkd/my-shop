import React from 'react';
import { useNavigate } from 'react-router-dom';

function DetailPageEvent({ product }) {
    /* 
    단순한 페이지 이동이 목적이라면 Link를 사용하면 되지만
    페이지 이동 및 데이터의 정보가 계속 바뀌어야 되는 상황이라면 useNavigate()를 사용해야 한다
    */

    const navigate = useNavigate();
    const setPrice = parseInt(product.price).toLocaleString(); //숫자단위나 날짜에서 자동으로 콤마를 찍어주는 메서드
    const detail = () => {
        navigate(`/products/detail/${product.id}`, {
            state : {
                id : product.id,
                title : product.title,
                image : product.image,
                price : product.price,
                option : product.option,
                category : product.category,
                description : product.description
            }
        })
    }
    return (
        <div onClick={detail}>
            <img src={product.image} alt={product.title} />
            <div className='textWrap'>
                <h3 className='itemTitle'>{product.title}</h3>
                <div className='itmeFlex'>
                    <p className='itemPrice'>{setPrice}원</p>
                    <p className='itemOpt'>{product.option}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailPageEvent;

