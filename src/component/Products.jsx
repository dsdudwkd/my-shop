import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductItem from './ProductItem';

function Products(props) {
    /* 
    서버에 데이터와의 동기화를 시켜주는 hook = @tanstack/react-query(최신버전) / react-query (react3버전까지)
    state를 대체하는 데이터 동기화 hook

    최신 버전 설치 명령어
    yarn add @tanstack/react-query
    */
    const {
        isLoading,
        error,
        data : products,

    } = useQuery({
        queryKey : ['products'], //가져오려는 값
        queryFn : getProducts //값을 가져올 때 사용할 함수
    });
    console.log(products); //제품 등록한 상품들 보임


    return (
        <>
        {isLoading && <p>상품 정보를 업데이트 중입니다.</p>}
        {error && <p>상품 정보를 불러올 수 없습니다.</p>}

        <ul className='productList'>
            {products && products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))
            }
        </ul>
        </>
    );
}

export default Products;