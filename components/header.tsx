"use client";

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styles from '@/styles/header.module.scss'
import { useEffect, useState } from 'react';

import Logo from '../public/images/logo.png'
import LogoWhite from '../public/images/next-logo-w.png'
import LogoIcon from '../public/images/icon.png'

import { SiFacebook, SiInstagram, SiMixcloud, SiSoundcloud, SiTwitter, SiYoutube } from 'react-icons/si'

interface INavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface IHeader {
  links: Array<INavLink>;
  logoUrl: string | null;
  logorText: string | null;
}

function NavLink({ url, text }: INavLink) {
  const path = usePathname();

  return (
    <Link href={url} className={undefined}>
      {text}
    </Link>
  );
}

export default function Header({
  links,
  logoUrl,
  logorText
}: IHeader) {
  // const navigation = links?.map((link: INavLink) => <NavLink key={link.id} {...link} />);

  const [data, setData] = useState<any>([]);
  const [socials, setSocials] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJson: any = await Promise.all([
          fetch('http://localhost:1337/api/menu-links'),
          fetch('http://localhost:1337/api/social-menus'),
        ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));

        setData(responseJson[0]);
        setSocials(responseJson[1]);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const menu = data?.data?.map((el: any) => {
    return <Link key={el.id} href={el.attributes.slug} >{el.attributes.label}</Link>
  });

  const socialLinks = socials?.data?.map((el: any) => {
    switch (el.attributes.label) {
      case 'facebook':
        return <Link key={el.id} href={el.attributes.link} ><SiFacebook color='white' /></Link>
      case 'instagram':
        return <Link key={el.id} href={el.attributes.link} ><SiInstagram color='white' /></Link>
      case 'mixcloud':
        return <Link key={el.id} href={el.attributes.link} ><SiMixcloud color='white' /></Link>
      case 'soundcloud':
        return <Link key={el.id} href={el.attributes.link} ><SiSoundcloud color='white' /></Link>
      case 'twitter':
        return <Link key={el.id} href={el.attributes.link} ><SiTwitter color='white' /></Link>
      case 'youtube':
        return <Link key={el.id} href={el.attributes.link} ><SiYoutube color='white' /></Link>
      default:
        return <Link key={el.id} href={el.attributes.link} >{el.attributes.label}</Link>
    }
  });

  return (
    <header className={styles.header}>
      <div className={`${styles.header_main}`}>
        <nav className={styles.header_main__navigation}>
          {
            menu ? menu : (
              <>
                <Link target='_blank' href='/podcast'>Podcast</Link>
                <Link target='_blank' href='/kosmos-mi'>Kosmos Mi</Link>
                <Link target='_blank' href='/podcast'>Podrži Sunce</Link>
                <Link target='_blank' href='/podcast'>Projekti</Link>
              </>
            )
          }
        </nav>
      </div>
      <div className={styles.header_main__logo}>
        <Image src={LogoWhite} alt='logo' quality={100} />
      </div>
      <div className={styles.header__socials}>
        {
          socialLinks ? socialLinks : (
            <>
              <Link href='/podcast'>
                <SiFacebook color='white' />
              </Link>
              <Link href='/kosmos-mi'>
                <SiMixcloud color='white' />
              </Link>
              <Link href='/podcast'>
                <SiInstagram color='white' />
              </Link>
              <Link href='/podcast'>
                <SiSoundcloud color='white' />
              </Link>
              <Link href='/podcast'>
                <SiYoutube color='white' />
              </Link>
            </>
          )
        }
      </div>
    </header>
  )
}
