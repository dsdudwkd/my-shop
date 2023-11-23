import React from 'react';
import DetailPageEvent from './DetailPageEvent';
import styled from 'styled-components';

function CategoryProductList({category, product}) {
    return (
        <div className='container'>
            <CategoryTitle>{category}</CategoryTitle>
            <ul className='productList'>
                {product.map((product)=>(
                    <li key={product.id}>
                        {/* <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                        <p>{parseInt(product.price).toLocaleString()}원</p> */}
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryProductList;

const CategoryTitle = styled.h2`
    font-size: 28px;
    padding: 24px 0 100px;
    text-align: center;
    font-weight: normal;
`