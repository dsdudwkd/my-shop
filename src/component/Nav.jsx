import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logOut, logIn, onUserState } from '../api/firebase';
import UserData from './UserData';
import { useAuthContext } from '../context/AuthContext';

function Nav(props) {

    // const [user, setUser] = useState();

    // useEffect(() => {
    //     onUserState((user) => {
    //         console.log(user);
    //         setUser(user);
    //     })
    // }, [])

    // useEffect(() => {
    //     onUserState(setUser);
    // }, [])

    // const userLogIn = () => {
    //     logIn().then(setUser);
    // }

    // const userLogOut = () => {
    //     logOut().then(setUser);
    // }

    const {user, logIn, logOut} = useAuthContext();

    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>Shop</h1>
            </Link>

            <nav>
                <Link to='/products/new'>
                    신상품
                </Link>
                <Link to='/products'>
                    모든 상품
                </Link>
            </nav>

            <div className='userWrap'>
                {user && user.isAdmin && (
                    <Link to='/products/new'>
                        신상 등록
                    </Link>
                )}
                {user && <UserData user={user} />}
                {!user && <button className='loginBtn' onClick={logIn}>Login</button>}
                {user && <button className='logoutBtn' onClick={logOut}>Logout</button>}
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