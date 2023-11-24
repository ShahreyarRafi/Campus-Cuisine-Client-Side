import { useLoaderData } from 'react-router-dom';
import AllMeals from '../../Components/AllMeals/AllMeals';

const AllMealsPage = () => {

    const allMeals = useLoaderData()

    return (
        <div>
            <AllMeals allMeals={allMeals}></AllMeals>
        </div>
    );
};

export default AllMealsPage;