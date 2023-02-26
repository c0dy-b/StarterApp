 /** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react/macro'
import { DataCard } from './card';

type PropTypes = {
    header: string;
    data: {
        description: string;
        date: Date;
        id: number;
    }[];
}

const array = [
    {
        description: "hello",
        date: new Date,
        id: 1
    },
    {
        description: "world",
        date: new Date,
        id: 1
    },
    {
        description: "not",
        date: new Date,
        id: 1
    },
    {
        description: "today",
        date: new Date,
        id: 1
    },
    {
        description: "testing",
        date: new Date,
        id: 1
    },

];

export const BasicPage: React.FC<PropTypes> = ({header, data}) => {
    return( 
    <div css={styles}>
        <div className='background'>
            
        <div className='content'>
            <div className='header-container'>
                <h1 className='header'>{header}</h1>
            </div>

            <>
            {(data.length > 0? data : array).map((response) => {
                return (
                    <DataCard key={response.id} data={response}/>
                )
            })}
            </>
        </div>
        </div>
    </div>
    )}

const styles = css`
.changing-something-minor{
    
}
    .background{
        width: 100%;
        height: 100vh;
        background-color: #808080;

        display: flex;
        justify-content: center;
    }

    .content{
        width: 55%;
        height: 100%;
        background-color: white;

        display: flex;
        align-items: center;
        flex-direction: column;
    
        overflow-y: auto;

    }.content::-webkit-scrollbar {
        display: none;
    }

    .header-container{
        width: 100%;
        height: 100px;

        .header{
            padding-left: 4rem;
        }
    }
`