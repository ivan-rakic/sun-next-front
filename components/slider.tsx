'use client';

import { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client'

import Image from 'next/image'
import styles from '../styles/slider.module.scss'
import Link from 'next/link';

import pic1 from '../public/images/astronaut.jpg'
import pic2 from '../public/images/flowers.jpg'
import pic3 from '../public/images/trees.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, EffectCreative, EffectFlip, Navigation, Pagination, EffectCube } from 'swiper/modules';
export default function Slider() {


  const [featuredContent, setFeaturedContent] = useState<any>([]);
  const [checkOutBox, setCheckOutBox] = useState<any>([]);

  const slides = [pic1, pic2, pic3, pic2, pic1, pic3]; // Add more images as needed

  const SLIDES = gql`{
      slides{
          data{
            attributes{
              slideBox{
                title
                isFeatured
                cover {
                  data{
                    attributes{
                      name
                    }
                  }
                }
                isFeatured
              }
            }
          }
        }
      }
      `

  // const { loading, error, data } = useQuery(SLIDES)

  // console.log(data);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseJson: any = await Promise.all([
  //         fetch('http://localhost:1337/api/slides?populate=*'),
  //       ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));

  //       // console.log(responseJson[0]);

  //       setFeaturedContent(responseJson[0]);
  //     }
  //     catch (err) {
  //       // console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    let checkOutBox = featuredContent?.data?.find((el: any) => el)?.attributes?.checkOutBox?.map((el: any) => el);
    setCheckOutBox(checkOutBox);
  }, [featuredContent]);

  const featuredContentBox = "test";

  // const featuredContentBox = data?.slides?.data[0]?.attributes.slideBox.map((el: any) => {
  //   console.log(el);
  //   return (
  //     <>
  //       <Link key={el?.id} target='_blank' href={"test"}>
  //         <span color={'white'}>{el.title}</span>
  //       </Link>
  //     </>
  //   )
  // });

  return (
    <main className={styles.slider}>
      <div className={styles.slider_content}>
        <Swiper
          effect={'slide'}
          autoplay={{ delay: 12000 }}
          speed={2600}
          allowTouchMove
          // navigation
          modules={[Autoplay]}
          className="mySwiper"
          slidesPerView={1}
        >
          <SwiperSlide>
            <Image src={pic2} alt='test' />
            <Link className={styles.slider_content__info} href="http://freepik.com">
              <div>
                <h2>123Ponesi Sunce sa Sobom - Novi serijal emisija</h2>
                <p> 123 Pobedi mrak, budi sunca zrak! Skini mobilnu aplikaciju! </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={pic3} alt='test' />
            <Link className={styles.slider_content__info} href="http://freepik.com">
              <div>
                <h2>333 Ponesi Sunce sa Sobom</h2>
                <p>333 Pobedi mrak, budi sunca zrak! Skini mobilnu aplikaciju! </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={pic1} alt='test' />
            <Link className={styles.slider_content__info} href="http://freepik.com">
              <div>
                <h2>444 Ponesi Sunce sa Sobom</h2>
                <p>444 Pobedi mrak, budi sunca zrak! Skini mobilnu aplikaciju! </p>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        {/* {slides.map((slide, index) => (
            <div className='alice-carousel__stage-hero' key={index}>
              <div className='alice-carousel__stage-r-heroimg'>
                <Image src={slide} alt='test' />
              </div>
              <p className='alice-carousel__stage-r-hero-name'> malo duze i ime i prezime malo duze i ime i prezime prezimeprezime</p>
              <p className='alice-carousel__stage-r-hero-desc'>opis kakav god hoces i kakav god neces, ponekad kratak ponekad dug</p>
            </div>
          ))} */}
      </div>
    </main >
  )
}
