import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function ProductItem({product : {id, image, title, price, option, description}}) {

    return (
        <li>
            {/* <img src={image} alt={title} />
            <div>
                <p>{title}</p>
                <p>{setPrice}원</p>
            </div> */}
            <DetailPageEvent product={{id, image, title, price, option, description}} />
        </li>
    );
}

export default ProductItem;