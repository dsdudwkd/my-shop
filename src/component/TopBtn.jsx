import { set } from 'firebase/database';
import React, { useEffect, useState } from 'react';

function TopBtn(props) {

    /* 
    screenTop은 화면의 상단 위치를 알려주는 속성,
    scrollTo = 문서에서 특정 위치로 이동 해준다 
    - 기준: 문서의 좌측상단을 기준으로 한다 (top, left가 기준)
    top : y축
    left : x축

    behavior = 이동 애니메이션 속성
    auto : 바로 위치로 이동 (기본값)
    smooth : 부드럽게 이동
    */

    /* 
    useState와 useEffect를 이용해서 특정 스크롤값(200px) 이동하게 되면 top버튼이 생기도록 수정
    */

    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= 200) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        })
    }, [])

    const scrollTopEvent = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const scrollBottomEvent = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight, //document의 높이 window는 출력물일 뿐
            behavior: 'smooth'
        })
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    /* 
    useEffect에 이벤트를 지정하는 이유
    1. 생명주기 관리에 용이 = 컴포넌트가 마운트되고 마운트가 해제되는 것들을 컨트롤 할 수 있다 => 불필요한 행동 방지
    useeffect로 리렌더링 될 때마다 새 이벤트가 추가로 발생하는 경우
    2. 성능 최적화
    */
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible); //마운트가 해제될 때 이벤트까지 삭제
        }
    }, [])

    return (
        /*  <>
             {showTopBtn && <button onClick={scrollTopEvent} style={{ position: 'fixed', bottom: '50px', right: '50px' }}>top</button>}
         </> */

        /* (
            <div
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: isVisible ? '1' : '0',
                    transition: '500ms',
                    pointerEvents: isVisible ? 'auto' : 'none'
                }}>
                <button onClick={scrollTopEvent} >top</button>
                <button onClick={scrollBottomEvent} >bottom</button>
            </div>
        ) */
            (isVisible &&
                <div style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <button onClick={scrollTopEvent} >top</button>
                    <button onClick={scrollBottomEvent} >bottom</button>
                </div>
            )






    );
}

export default TopBtn;