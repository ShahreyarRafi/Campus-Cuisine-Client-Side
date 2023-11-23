import { useLoaderData } from 'react-router-dom';
import Banner from '../../Components/Header/Banner/Banner'
import WhyUs from '../../Components/WhyUs/WhyUs';


const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <WhyUs></WhyUs>
        </div>
    );
};

export default Home;
