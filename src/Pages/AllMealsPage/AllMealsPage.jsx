import { useLoaderData } from 'react-router-dom';
import AllMeals from '../../Components/AllMeals/AllMeals';

const AllMealsPage = () => {

    const allmeals = useLoaderData()

    return (
        <div>
            <AllMeals allmeals={allmeals}></AllMeals>
        </div>
    );
};

export default AllMealsPage;