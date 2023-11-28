import { useLoaderData } from 'react-router-dom';
import Banner from '../../Components/Header/Banner/Banner'
import WhyUs from '../../Components/WhyUs/WhyUs';
import MealsByCategory from '../../Components/MealsByCategory/MealsByCategory';
import Membership from '../../Components/Membership/Membership';


const Home = () => {

    const allMeals = useLoaderData()

    return (
        <div>
            <Banner></Banner>
            <MealsByCategory allMeals={allMeals}></MealsByCategory>
            <Membership></Membership>
            <WhyUs></WhyUs>
        </div>
    );
};

export default Home;
