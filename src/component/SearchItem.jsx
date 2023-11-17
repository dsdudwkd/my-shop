import React, { useEffect, useState } from 'react';
import { searchProduct } from '../api/firebase';
import SearchItemList from './SearchItemList';

function SearchItem(props) {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => { //query가 있을때에만 실행하도록 useEffect 사용
        if (query.trim() === '') {
            setResult([])
        } else {
            searchProduct(query).then((text) => {
                // console.log(result)
                setResult(text)
            }).catch((error) => {
                console.error(error);
            })
        }


    }, [query]);


    const inputEvent = (e) => {
        setQuery(e.target.value);
        // console.log(query);
    }

    return (
        <div className='container'>
            <input type="text" value={query} onChange={inputEvent} className='searchForm'/>

            <ul className='searchResultList'>
                {result.map((product)=>(
                    <SearchItemList key={product.id} products={product}/>

                ))}
            </ul>
        </div>


    );
}

export default SearchItem;