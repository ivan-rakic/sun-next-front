"use client";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useEffect, useState } from 'react';


import Image from 'next/image'
import styles from '../styles/slider.module.scss'
import Link from 'next/link';

export default function Player() {

  const [playerData, setPlayerData] = useState<any>([]);
  const [checkOutBox, setCheckOutBox] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJson: any = await Promise.all([
          fetch('https://stream.radiojar.com/'),
        ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));
        // ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));

        console.log(responseJson[0], 'player');

        // setPlayerData(responseJson[0]);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // let checkOutBox = playerData?.data?.find((el: any) => el)?.attributes?.checkOutBox.map((el: any) => el);
    // setCheckOutBox(checkOutBox);
    // console.log(checkOutBox);
  }, [playerData]);


  // const playerDataBox = checkOutBox?.map((el: any) => {
  //   return (
  //     <>
  //       <Link key={el?.id} target='_blank' href={el ? el?.attributes?.link : ""}>
  //         <span>{el.title}</span>
  //       </Link>
  //     </>
  //   )
  // });




  return (
    <main className={undefined}>
      


    </main>
  )
}
