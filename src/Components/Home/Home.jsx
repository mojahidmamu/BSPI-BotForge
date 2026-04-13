import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import Location from '../Location/Location';
import Moderator from '../Moderator/Moderator';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <Moderator></Moderator>
            <FAQ></FAQ> 
            <Location></Location>
        </div>
    );
};

export default Home;