 /** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react/macro'
import moment from 'moment'

type DataCardTypes = {
    data: {
        description: string;
        date: Date;
        id: number;
    }
}

export const DataCard: React.FC<DataCardTypes> = ({data}) => {
    return <div css={styles}>
        <div className='container'>
        <div className='data-card'>
            
            <div className='data-info'>
                {`Id: ${data.id}`}
            </div>

            <div className='data-info'>
                {`Date: ${moment(data.date).format('MM/DD/YYYY')}`}
            </div>

            <div className='data-info'>
                {`Description: ${data.description}`}
            </div>
        </div>
        </div> 
        </div>
}

const styles = css`

.container{
    padding-bottom: 2rem;
    padding-top: 2rem;

    .data-card{
        width: 500px;
        height: 200px;
        background-color: black;
        border-radius: 05px;
        color: white;
        
        display: flex;
        flex-direction: column;

        
        /* @media screen and (min-width: 1240px) {
            width: 100%;
            
        } */

        .data-info{
            padding-top: 1rem;
        }
    }
}
`
