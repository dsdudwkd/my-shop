import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductDetail(props) {

  
    // useLocation() = 현재 url의 정보를 가져오는 리액트 DOM hook

    const state = useLocation().state;
    // console.log(state); //제품 정보
    const {id,title, image, price, option, desciption} = state;

    return (
        <div className='container'>
            <div className='detailPage'>
                <div className='detailImg'>
                    <img src={image} alt={title} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;