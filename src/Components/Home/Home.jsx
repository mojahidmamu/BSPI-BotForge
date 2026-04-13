import React from 'react';
import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import FAQ from '../FAQ/FAQ';
import Location from '../Location/Location';
import Moderator from '../Moderator/Moderator';

// import image1 from "../../assets/image/Moderator/A.jpeg";
// import image2 from "../../assets/image/Moderator/B.jpeg";
// import image3 from "../../assets/image/Moderator/C.jpeg";
// import image4 from "../../assets/image/Moderator/D.jpeg";
// import image5 from "../../assets/image/Moderator/E.jpeg";
// import image6 from "../../assets/image/Moderator/F.jpeg";
// import image7 from "../../assets/image/Moderator/G.jpeg";
// import image8 from "../../assets/image/Moderator/H.jpeg";
// import principal from "../../assets/image/Moderator/Principal.jpeg";

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