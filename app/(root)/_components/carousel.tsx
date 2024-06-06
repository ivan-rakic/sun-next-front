'use client'
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import Image from "next/image";
import React from "react";
import img1 from "@/public/images/astronaut.jpg";
import img2 from "@/public/images/beach.jpg";
import img3 from "@/public/images/ocean.jpg";
import img4 from "@/public/images/mountains.jpg";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";


export const Carousel = () => {
    const slides = [
        { src: img1, name: "Slide 1", desc: "Description 1", stat: "Stat 1" },
        { src: img2, name: "Slide 2", desc: "Description 2", stat: "Stat 2" },
        { src: img3, name: "Slide 3", desc: "Description 3", stat: "Stat 3" },
        { src: img4, name: "Slide 4", desc: "Description 4", stat: "Stat 4" }
    ];
    return (
        <div className='flex overflow-hidden w-full mt-10 mb-10'>
            <AliceCarousel
                autoPlay
                infinite
                mouseTracking
                touchTracking
                disableDotsControls
                autoPlayInterval={6000}
                responsive={{
                    0: { items: 1 },
                    600: { items: 2 },
                    1024: { items: 3 },
                }}
                controlsStrategy="alternate"
                animationType="slide"
                animationDuration={2000}
                renderNextButton={() => <button className="custom-next-button"><RiArrowRightDoubleFill /></button>}
                renderPrevButton={() => <button className="custom-prev-button"><RiArrowLeftDoubleFill /></button>}
            >
                {slides.map((slide, index) => (
                    <div className='alice-carousel__stage-div' key={index}>
                        <p className='alice-carousel__stage-r-name'>{slide.name}</p>
                        <p className='alice-carousel__stage-r-desc'>{slide.desc}</p>
                        <p className='alice-carousel__stage-r-stat'>{slide.stat}</p>
                        <div className='alice-carousel__stage-imageDiv'>
                            <Image src={slide.src} alt='test' width={50}/>
                        </div>
                    </div>
                ))}
            </AliceCarousel>
        </div>
    );
};
