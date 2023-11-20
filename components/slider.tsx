'use client';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';
import { useEffect, useState } from 'react';
import withAutoplay from 'react-awesome-slider/dist/autoplay.js';

import { useQuery, gql } from '@apollo/client'

import Image from 'next/image'
import styles from '../styles/slider.module.scss'
import Link from 'next/link';

import pic1 from '../public/images/astronaut.jpg'
import pic2 from '../public/images/flowers.jpg'
import pic3 from '../public/images/trees.jpg'

export default function Slider() {

  const [featuredContent, setFeaturedContent] = useState<any>([]);
  const [checkOutBox, setCheckOutBox] = useState<any>([]);

  const AutoplaySlider = withAutoplay(AwesomeSlider);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJson: any = await Promise.all([
          fetch('http://localhost:1337/api/slides?populate=*'),
        ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));

        console.log(responseJson[0]);

        setFeaturedContent(responseJson[0]);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let checkOutBox = featuredContent?.data?.find((el: any) => el)?.attributes?.checkOutBox?.map((el: any) => el);
    setCheckOutBox(checkOutBox);
    console.log(checkOutBox);
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
        {/* <AutoplaySlider play={true} transitionDelay={3000} style={{ backgroundcolor: 'red' }} animation='openAnimation' bullets={false} className={styles.awe_slider}> */}
          {/* <div>
            <Image src={pic1} alt='nesto' className={styles.awe_slider_img} />
          </div>
          <div>
            <Image src={pic2} alt='nesto' className={styles.awe_slider_img} />
          </div>
          <div>
            <Image src={pic3} alt='nesto' className={styles.awe_slider_img} />
          </div> */}
          {
            featuredContentBox ? featuredContentBox : (
              <>
                not working
              </>
            )
          }
        {/* </AutoplaySlider> */}
      </div>
    </main>
  )
}
