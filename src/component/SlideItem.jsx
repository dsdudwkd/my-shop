import React, { useEffect, useState } from 'react';
import  { Swiper, SwiperSlide } from 'swiper/react'; //리액트에서의 기본 swiper import
import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css/effect-fade';

import 'swiper/css'; //기본 swiper css
import { getStorageImg, storage } from '../api/firebase';

function SlideItem({imgs}) {

    const sliderImage = [
       /* 
       firebase Storage 시작하기 -> 프로덕션 -> 지역 동아시아로 설정
       */
    ]
    
    const [imgUrl, setImgUrl] = useState([]);
    useEffect(()=>{

        const loadImg = async () => {
            try{
                const urls = await Promise.all(
                    imgs.map((imgPath)=>getStorageImg(imgPath))
                );
                setImgUrl(urls);
                // console.log(urls);
            } catch(error){
                console.error(error);
            }
        }
        loadImg();
    },[imgs])
    const slider = {
        width : '500px',
        height : '600px',
    }
    return (
        <>
            <Swiper style={slider}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2000 }}
                speed={2000}
                modules={[Autoplay, EffectFade]}
                effect={'fade'}
            >

            {imgUrl.map((el, index)=>(
                <SwiperSlide key={index} style={{background:`url(${el}) no-repeat center center / cover`}} />
            ))}
            </Swiper>
        </>
    );
}

export default SlideItem;