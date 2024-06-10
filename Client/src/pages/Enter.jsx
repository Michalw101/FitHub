import React from "react";
import { NavLink } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../css/enter.css';

import logo from '../images/FITHUB.png'
import logo1 from '../images/FITHUB_1.png'
import logo2 from '../images/FITHUB_2.png'
import logo3 from '../images/FITHUB_3.png'




export default function EnterPage() {

    const images = [
        {
            original: logo,
            thumbnail: logo,
        },
        {
            original: logo3,
            thumbnail: logo3,
        },
        {
            original: 'https://www.proflexgym.co.uk/s/cc_images/teaserbox_2489608528.JPG?t=1706200550',
            thumbnail: 'https://www.proflexgym.co.uk/s/cc_images/teaserbox_2489608528.JPG?t=1706200550',
        },
        {
            original: 'https://www.hussle.com/blog/wp-content/uploads/2022/04/DSC_0503-1080x675.jpg',
            thumbnail: 'https://www.hussle.com/blog/wp-content/uploads/2022/04/DSC_0503-1080x675.jpg',
        },
        {
            original: 'https://www.newstar.co.il/wp-content/uploads/2023/10/1200-weight-lifting-gloves-6528a276cf5e45efa750a5e54728b1a1.jpg',
            thumbnail: 'https://www.newstar.co.il/wp-content/uploads/2023/10/1200-weight-lifting-gloves-6528a276cf5e45efa750a5e54728b1a1.jpg',
        }
    ];

    return (
        <>
            <div className='enterLinks'>
                <NavLink to="/login" className="styledLink">Get Started</NavLink>
                <NavLink to="/blog" className="styledLink">Blogs</NavLink>
                <NavLink to="/trainers" className="styledLink">Our Trainers</NavLink>
            </div>

            <div className="enterPageWelcome">
                <button className="button1" data-text="Awesome">
                    <span className="actual-text">&nbsp;Welcome to FitHub&nbsp;</span>
                    <span aria-hidden="true" className="hover-text">&nbsp;Welcome to FitHub&nbsp;</span>
                </button>
            </div>

            <div className="imageGallery">
                <ImageGallery
                    items={images}
                    showThumbnails={true}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    autoPlay={true}
                    slideInterval={3000}
                />
            </div>
        </>
    );
}
