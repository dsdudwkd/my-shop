import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
 margin: 0;
 padding: 0;
 border: 0;
 font-size: 100%;
 /* font: inherit; */
 vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
 display: block;
}
body {
 line-height: 1;
}
ol, ul {
 list-style: none;
}
blockquote, q {
 quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
 content: '';
 content: none;
}
table {
 border-collapse: collapse;
 border-spacing: 0;
}
a{
 text-decoration: none;
}
img{
 display: block;
 width: 100%;
}
button{
   cursor: pointer;
}
.container{
    max-width: 1280px;
    margin: 0 auto;
}
.productList{
    display: flex;
    gap: 24px 5%;
    flex-wrap: wrap;
    li{
        flex-shrink: 0;
        flex-basis: 30%;
    }
}

/* ProductDetail 페이지 */
.detailPage{
    max-width:1024px;
    display:flex;
    gap: 40px;
    margin: 0 auto;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        h2{
            font-size:24px;
            width:100%;
            font-weight: normal;
            border-bottom: 1px solid #ddd;
            padding-bottom: 16px;
        }
        p{
            width: 100%;
            padding-bottom: 16px;
            color: rgba(0, 0, 0, 0.7);
            display: flex;
            font-size: 18px;
            span{
                padding-left: 100px;
            }

        }
        .detailOpt{
            width: 100%;
            display: flex;
            align-items: center;
            label{
                font-size: 20px;
                color:rgba(0, 0, 0, 0.7);
            }
            select{
                margin-left:100px;
                width: 100px;
                padding: 6px 12px;
                background: transparent;
                border: 1px solid black;
                border-radius: 3px;
            }
        }
        .detailBtns{
            display: flex;
            gap: 16px;
            margin-top: auto;
            flex-direction: column;
            button{
                width: 100%;
                height: 50px;
                border-radius: 5px;
                border: none;
                font-size: 15px;
            }
            .cartBtn{
                background-color: beige;
            }
            .buyBtn{
                background-color: blanchedalmond;
            }
        }
    }
}

//cart
.cartList{
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-top: 1px solid #ddd;
    padding: 24px 0;
    li{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 12px 0;
        gap: 12px;
        img{
            width: 100px;
            display: block;
        }
    }
}

//검색창


.searchForm{
    width: 100%;
    height: 50px;
    margin-bottom: 50px;
    background-color: white;
    border: none;
    font-size: 20px;
    border-radius: 10px;
    box-sizing: border-box;
}

//search result
.searchResultList{
    display: flex;
    gap: 12px;
    flex-direction: column;
    li{
        > div{
            display: flex;
            gap: 30px;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #ddd;
        }
    }
    img{
        width: 150px;
        
    }
}


`

export default GlobalStyle;