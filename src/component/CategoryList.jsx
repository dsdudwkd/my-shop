import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategory } from '../api/firebase';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function CategoryList(props) {

    const { data: categories } = useQuery(['categories'], getCategory);
    // console.log(categories)
    const setCategory = new Set(); //특정한 값을 배열로 출력해줄 때 중복 요소를 걸러준다

    if (categories) {
        categories.forEach((categoryObj) => {
            setCategory.add(categoryObj.category); //배열에 추가
        })
    }
    const setCategoryArr = [...setCategory];
    // console.log(setCategoryArr);

    return (
        /* 스타일 컴포넌트 */
        <CategoryItemList>
            {setCategoryArr && setCategoryArr.map((category, index) => (
                <CategoryItem key={index}>
                    <Link to={`/products/${category}`}>
                        {category}
                    </Link>

                </CategoryItem>
            ))}
        </CategoryItemList>
    );
}

export default CategoryList;

const CategoryItemList = styled.ul`
    display: flex;
    gap: 30px;
    padding: 24px;
`

const CategoryItem = styled.li`
    a{
        color: #333;
    }
`