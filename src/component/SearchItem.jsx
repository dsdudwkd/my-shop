import React, { useEffect, useState } from 'react';
import { searchProduct } from '../api/firebase';
import SearchItemList from './SearchItemList';

function SearchItem(props) {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    //한글자만 검색해도 상품 결과 바로 보이게 하기
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

    //키워드를 입력 후 검색 버튼을 눌러서 상품 결과 보이게 하기
    /* const searchEvent = () => {
        if (query.trim() === '') {
            setResult([]);
        } else {
            searchProduct(query).then((text) => {
                setResult(text);
            }).catch((error) => console.error(error));
        }
    } */

    return (
        <div className='container'>
            <input type="text" value={query} onChange={inputEvent} className='searchForm' />

            <ul className='searchResultList'>
                {result.map((product) => (
                    <SearchItemList key={product.id} products={product} />

                ))}
            </ul>
            {/* <button onClick={searchEvent}>검색</button> */}
        </div>


    );
}

export default SearchItem;