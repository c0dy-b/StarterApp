import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataCard } from '../components/card';
import { BasicPage } from '../components/basic-page';

export const Home = () => {
    const BaseURL = process.env.REACT_APP_BASE_API_ENTRIES_URL;
    const [data, setData] = useState([]);

    type responseData = {
        id: number;
        description: string;
        date: Date;
    }

   useEffect(() => {
    axios.get<any>(BaseURL + 'get-all')
    .then((response) => {
        setData(response.data)
        console.log('RESPONSE:', response)
    })
    .catch((error) => {
        console.log("ERROR:", error)
    })
   }, []) 
   
   const printFetchedData = `${JSON.stringify(data, null, 2)}`

    return (
        <BasicPage/>
    )
}