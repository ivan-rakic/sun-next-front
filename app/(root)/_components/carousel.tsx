'use client'
import {RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
import {CarouselItem} from "@/app/(root)/_components/carousel-item";

type Slide = {
    name: string,
    desc: string,
    stat: string,
    src: string
};

type Props = {
    slides: Slide[]
};

export const Carousel = ({slides}:Props) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !slides) return null;

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
                    <CarouselItem key={index} name={slide.name} desc={slide.desc} stat={slide.stat} src={slide.src}/>
                ))}
            </AliceCarousel>
        </div>
    );
};
