import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProduct, getStorageImg, storage } from '../api/firebase';
import CategoryList from './CategoryList';
import CategoryProductList from './CategoryProductList';
import SlideItem from './SlideItem';
import { listAll, ref } from 'firebase/storage';

function CategoryPage(props) {

    const [product, setProduct] = useState([]);
    const {category} = useParams(); //category에 담겨있는 정보를 가져옴
    const [imgUrls, setImgUrls] = useState([]);

    useEffect(()=>{
        getCategoryProduct(category).then((products)=>{
            setProduct(products);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[category])

    useEffect(()=>{
        const fetchImgs = async () =>{
            const imgListRef = ref(storage, `${category}`);
            
            try{
                const imgRef = await listAll(imgListRef);
                const selectRef = categoryRandomRef(imgRef.items, 3);
                const urls = await Promise.all(
                    selectRef.map((ref)=>getStorageImg(ref))
                );
                setImgUrls(urls)
            } catch(error){
                console.error(error);
            }
           
            
        }
        fetchImgs();
    },[category]) //카테고리를 눌렀을 때 한 번만 마운트 되면되므로 빈배열

    function categoryRandomRef(refs, count){
        return refs.sort(()=> 0.5 - Math.random()).slice(0, count); //순서를 무작위로 섞는 공식
        /* 
        sort : 순서를 특정한 기준에 의해서 정렬을 하는 메서드[-1, 0, 1] 0은 정렬을 안
        받아온 배열에서 sort를 돌려서 -1, 0, 1이 나오도록 랜덤의 수를 생성 (Math.random())
        Math.random()은 0~1사이의 값을 반환하게 되는데 반환되는 값에서 0.5를 빼면 균등하게 음수와 양수를 뽑아낼 수 있다
        0.5외에 다른 숫자가 들어올 수 있지만 가장 균등한 확률의 중간값인 0.5를 넣어준다

        slice는 정렬된 배열 값을 시작순번부터 끝나는 순번까지 잘라내는 역할
        ex) a, b를 sort를 이용해서 정렬할 때 -1을 반환하게 되면 앞으로 가게되고 1을 반환하게 되면 뒤로 가게되며 0을 반환할 경우 정렬하지 않는다
        */
    }
    return (
        <div>
            <SlideItem imgs={imgUrls}/>
            <CategoryProductList category={category} product={product} />
        </div>
    );
}

export default CategoryPage;