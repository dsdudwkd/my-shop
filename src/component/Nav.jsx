import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logOut, logIn, onUserState } from '../api/firebase';
import UserData from './UserData';
import { useAuthContext } from '../context/AuthContext';
import CategoryList from './CategoryList';

function Nav(props) {

    // const [user, setUser] = useState();

    // 

    // useEffect(() => {
    //     onUserState(setUser);
    // }, [])

    // const userLogIn = () => {
    //     logIn().then(setUser);
    // }

    // 

    //로그인 or 로그아웃 버튼 활성화 방법 1
    // const { user, logIn, logOut } = useAuthContext();

    //로그인 or 로그아웃 버튼 활성화 방법 2
    const [user, setUser] = useState('');
    const userLogOut = () => {
        logOut().then(setUser);
    }

    useEffect(() => {
        onUserState((user) => {
            console.log(user);
            setUser(user);
        })
    }, [])

    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>Shop</h1>
            </Link>

            <nav>
                {/* <Link to='/products/new'>
                    신상품
                </Link> */}
                <CategoryList />
                <Link to='/products'>
                    모든 상품
                </Link>
            </nav>

            <div className='userWrap'>
                <Link to='/search'>검색</Link>
                <Link to='/cart'>장바구니</Link>

                {user && user.isAdmin && (
                    <Link to='/products/new'>
                        신상 등록
                    </Link>
                )}
                {/* {user && <UserData user={user} />}
                {!user && <button className='loginBtn' onClick={logIn}>Login</button>}
                {user && <button className='logoutBtn' onClick={logOut}>Logout</button>}
                <Link to={'/login'}>
                    로그인
                </Link> */}
                {user ? (
                    <> {/* 조건문 fragment로 감싸기 */}
                        {user && <UserData user={user} />}

                        {/* 로그아웃 버튼 활성화 방법 1 */}
                        {/* <button onClick={logOut} className='logoutBtn'>로그아웃</button> */}
                        {/* 로그아웃 버튼 활성화 방법 2 */}
                        <button onClick={userLogOut} className='logoutBtn'>로그아웃</button>
                    </>
                ) : (
                    <Link to='/login'>
                        <button className='loginBtn'>로그인</button>
                    </Link>
                )}
            </div>
        </HeaderContainer>
    );
}

export default Nav;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    a{
        text-decoration: none;
        color: #333333;
        h1{
            font-size: 30px;
        }
    }
    nav{
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: 50px;
    }
    .userWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: 12px;
        button{
            border: none;
            border-radius: 6px;
            padding: 6px 12px;
            cursor: pointer;
        }
        .loginBtn{
            background-color: pink;
        }
        .logoutBtn{
            background-color: lightgray;
        }
    }
    

`