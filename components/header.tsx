import Link from 'next/link';
import styles from '@/styles/header.module.scss'
import { useEffect, useState } from 'react';

import { RiAliensLine } from "react-icons/ri";
import { RiPlayCircleLine } from "react-icons/ri";
import { RiPlanetLine } from "react-icons/ri";
import { RiSunLine } from "react-icons/ri";
import { RiSoundModuleLine } from "react-icons/ri";
import { RiSpeakerLine } from "react-icons/ri";

import { SiFacebook, SiInstagram, SiMixcloud, SiSoundcloud, SiTwitter, SiYoutube } from 'react-icons/si'

export default function Header({ data }: HeaderProps) {
  console.log(data);

  const menu = data?.data?.map((el: any) => {
    switch (el.attributes.slug) {
      case 'portal':
        return <Link key={el.attributes.slug} id={el.attributes.slug} className={"podcast"} href={el.attributes.slug}>
          <RiPlanetLine /> {el.attributes.label}
        </Link>
      case 'kosmos-mi':
        return <Link key={el.attributes.slug} id={el.attributes.slug} className={"podcast"} href={el.attributes.slug}>
          <RiAliensLine /> {el.attributes.label}
        </Link>
      case 'podrzi-sunce':
        return <Link key={el.attributes.slug} id={el.attributes.slug} className={"podcast"} href={el.attributes.slug}>
          <RiSunLine /> {el.attributes.label}
        </Link>
      case 'projekti':
        return <Link key={el.attributes.slug} id={el.attributes.slug} className={"podcast"} href={el.attributes.slug}>
          <RiSoundModuleLine /> {el.attributes.label}
        </Link>
      default: return;
    }
  });

  // const socialLinks = socials?.data?.map((el: any) => {
  //   switch (el.attributes.label) {
  //     case 'facebook':
  //       return <Link key={el.id} href={el.attributes.link ?? ''} ><SiFacebook color='1877f2' /></Link>
  //     case 'instagram':
  //       return <Link key={el.id} href={el.attributes.link ?? ''} ><SiInstagram color='e1306c' /></Link>
  //     case 'mixcloud':
  //       return <Link key={el.id} href={el.attributes.link ?? ''} ><SiMixcloud color='52aad8' /></Link>
  //     case 'soundcloud':
  //       return <Link key={el.id} href={el.attributes.link ?? ''} ><SiSoundcloud color='ff8800' /></Link>
  //     case 'youtube':
  //       return <Link key={el.id} href={el.attributes.link ?? ''} ><SiYoutube color='ff0000' /></Link>
  //     default: return;
  //   }
  // });

  const socialLinks = undefined;

  return (
    <header className={styles.header}>
      <div className={`${styles.header_main}`}>
        <nav className={styles.header_main__navigation}>
          {
            menu ? menu : (
              // fallback
              <>
                <Link href='/kosmos-mi'>Kosmos Mi</Link>
                <Link href='/podrzi-sunce'>Podrži Sunce</Link>
                <Link href='/projekti'>Projekti</Link>
              </>
            )
          }
        </nav>
        <div className={styles.header_main__logo}>
          <Link href='/' />
        </div>
        <div className={styles.header_main__socials}>
          {
            socialLinks ? socialLinks : (
              // fallback
              <nav>
                <Link target='blank' title='Facebook' href='https://www.facebook.com/sunradio.rs/'>
                  <SiFacebook color='1877f2' />
                </Link>
                <Link href='/kosmos-mi'>
                  <SiMixcloud color='52aad8' />
                </Link>
                <Link href='/podcast'>
                  <SiInstagram color='e1306c' />
                </Link>
                <Link href='/podcast'>
                  <SiSoundcloud color='ff8800' />
                </Link>
                <Link color='#ff0000' href='/podcast'>
                  <SiYoutube color='ff0000' />
                </Link>
              </nav>
            )
          }
        </div>
      </div>
    </header>
  )
};
