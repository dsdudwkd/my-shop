import React, { useEffect, useState } from 'react';
import Products from '../component/Products';
import SlideItem from '../component/SlideItem';
import { listAll, ref } from 'firebase/storage'; //파이어베이스가 아닌 스토리지
import { getStorageImg, storage } from '../api/firebase';

function AllProduct(props) {

    /* const slidePath = [
        'https://firebasestorage.googleapis.com/v0/b/my-shop-23961.appspot.com/o/40399e88b_320x320_95_FIT.jpg?alt=media&token=5e6bb5df-e503-4aef-8b71-28d53f0b4a4a',
        'https://firebasestorage.googleapis.com/v0/b/my-shop-23961.appspot.com/o/45cc0658e_320x320_95_FIT.jpg?alt=media&token=742903ff-7db6-45cc-a7ef-f522717e0405',
    ] */

    const [imgUrls,  setImgUrls] = useState([]);
    useEffect(()=>{
        const fetchImgs = async () => {
            const imgListRef = ref(storage);
            try{
                const imgRef = await listAll(imgListRef);
                const selectRef = categoryRandomRef(imgRef.items, 4);
                const urls = await Promise.all(
                    selectRef.map((ref)=>getStorageImg(ref))
                );
                setImgUrls(urls);
            }catch(error){
                console.error(error);
            }
        }
        fetchImgs();
        // console.log(imgUrls);
    }, [])

    function categoryRandomRef(refs, count){
        return refs.sort(()=>0.5 - Math.random()).slice(0,count)
    }

    return (
        <div className='container'>
           <SlideItem imgs={imgUrls} />
           <Products /> 
        </div>
    );
}

export default AllProduct;