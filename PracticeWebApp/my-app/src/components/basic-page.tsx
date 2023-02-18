 /** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react/macro'

export const BasicPage = () => {
    return( 
    <div css={styles}>
        <div className='background'>
        <div className='content'></div>
        </div>
    </div>
    )}

const styles = css`
    .background{
        height: 100vh;
        width: 100%;
        background-color: #0A1828;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content{
        width: 65%;
        height: 100vh;
        background-color: #002349;
    }
`