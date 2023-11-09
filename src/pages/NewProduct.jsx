import React, { useState } from 'react';
import styled from 'styled-components';
import { addProducts } from '../api/firebase';
import { upLoadImg } from '../api/imgUpload';
function NewProduct(props) {

    //모든 상품의 상태를 빈 문자열로 초기화
    const [product, setProduct] = useState({
        title : '',
        price : '',
        option : '',
        category : '',
        description : ''
    })

    
    const [file, setFile] = useState(null); //업로드된 파일 초기화
    const [isLoading, setIsLoading] = useState(false); //업로드 상태 초기화(업로드 시 true)
    const [success, setSuccess] = useState(null); //업로드 완료했는지 체크
    const [error, setError] = useState(null);

    const onChange = (e) => {
        const {name, value, files} = e.target;

        if(name === 'file' && files && files[0]){
            setFile(files[0]);
        } else{
            setProduct((prevProduct)=>({...prevProduct,[name] : value}))
        }

    }
    
    const onSubmit = async(e)=>{
        e.preventDefault(); //리액트에서는 기본 이벤트를 없애는 기능이 없기 때문에 무조건 preventDefault()를 항상 넣어줘야 한다
        setIsLoading(true); 

        try{
            const url = await upLoadImg(file);
            await addProducts(product, url) //파이어베이스 데이터 연동 스크립트 실행
            setSuccess('업로드가 완료 되었습니다.');
            setTimeout(()=>{
                setSuccess(null);
            },2000);
            setProduct({
                title : '',
                price : '',
                description : '',
                option : '',
                category : ''
            });
            setFile(null);

        }catch(error){ /* 에러 잡을 때 */
            console.error(error);
            setError('업로드 실패');
        } finally { /* 요청 후 작업 */
            setIsLoading(false);
        }
    }

    return (
        <div className='container'>
            <FormContainer>

                {success && <p className = 'resultText'>{success}</p>}

                <div className='imgWrap'>
                    {file && (
                        <img src={URL.createObjectURL(file)} alt={product.title} />
                    )}
                </div>

                <form onSubmit={onSubmit}>
                    {/* 이미지 업로드 */}
                    <input type="file" name='file' accept="'image/*" onChange={onChange} />
                    {/* 제목 */}
                    <input type="text" name='title' placeholder='제목을 입력하세요.' value={product.title} onChange={onChange} />
                    {/* 가격 설정 */}
                    <input type="text" name='price' placeholder='상품 가격' value={product.price} onChange={onChange} />
                    {/* 상품 카테고리 */}
                    <input type="text" name='category' placeholder='상품 분류' value={product.category} onChange={onChange} />
                    {/* 상품 옵션 */}
                    <input type="text" name='option' placeholder='상품 옵션' value={product.option} onChange={onChange} />
                    {/* 제품 설명 */}
                    <input type="text" name='description' placeholder='제품 설명' value={product.description} onChange={onChange} />
                    
                    <button disabled={isLoading}>
                        {isLoading ? '업로드 중' : '제품 등록하기'}
                    </button>
                </form>
            </FormContainer>
        </div>
    );
}

export default NewProduct;

const FormContainer = styled.div`
    max-width: 1280px;
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    .imgWrap{
        max-width: 500px;
        height: 500px;
        img{
            display: block;
            height: 100%;
        }
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        input{
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            border-radius: 4px;
            border: none;
        }
        button{
            margin-top: 50px;
            height: 50px;
            border-radius: 5px;
            background-color: pink;
            border: none;
        }
    }
`