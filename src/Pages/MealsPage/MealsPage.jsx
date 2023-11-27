import { useLoaderData } from 'react-router-dom';
import Meals from '../../Components/Meals/Meals';

const MealsPage = () => {

    const allMeals = useLoaderData()

    return (
        <div>
            <Meals allMeals={allMeals}></Meals>
        </div>
    );
};

export default MealsPage;