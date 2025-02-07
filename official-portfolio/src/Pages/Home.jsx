import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import AboutMe from '../components/AboutMe';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Education from '../components/Education';
const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <AboutMe></AboutMe>
            <Skills></Skills>
            <Education></Education>
            <Projects></Projects>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;