import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import Location from '../Location/Location';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <FAQ></FAQ>
            <Location></Location>
        </div>
    );
};

export default Home;