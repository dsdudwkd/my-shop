import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function CategoryProductList({category, product}) {
    return (
        <div className='container'>
            <h2>{category}</h2>
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