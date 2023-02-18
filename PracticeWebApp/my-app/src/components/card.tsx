 /** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react/macro'

export const DataCard = () => {
    return <div  css={styles}>
        <div className='testing'>
            Hello World
        </div></div> 
}

const styles = css`
    .testing{
        width: 30%;
        height: 200px;
        background-color: red;
    }
`
