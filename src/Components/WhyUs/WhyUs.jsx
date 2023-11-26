import home1 from '../../assets/images/home1.png'

const WhyUs = () => {
    return (
        <section className="bg-white dark:bg-gray-900 font-primary">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Culinary Campus Hub</h2>
                    <p className="mb-4">Welcome to Campus Cuisine, your ultimate destination for seamless hostel living in university! Our innovative hostel management platform is designed to enhance your campus experience by providing a hassle-free and delicious dining journey. Explore a world of culinary delights, streamlined facilities, and efficient services that cater to your every need. From meal plans to event bookings, Campus Cuisine is your trusted companion for a thriving university life. Join us in redefining hostel living – where convenience meets culinary excellence!</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src="https://i.ibb.co/dMyHfZD/Home2.png" alt="office content 1" />
                    <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://i.ibb.co/VNsS9sk/Untitled-design-66.png" alt="office content 2" />
                </div>
            </div>
        </section>
    );
};

export default WhyUs;