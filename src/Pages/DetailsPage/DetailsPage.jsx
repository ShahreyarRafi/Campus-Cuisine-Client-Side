import React from 'react';
import Details from '../../Components/Details/Details';
import { useLoaderData } from 'react-router-dom';

const DetailsPage = () => {

    const meal = useLoaderData()


    return (
        <div>
            <Details meal={meal}></Details>
        </div>
    );
};

export default DetailsPage;