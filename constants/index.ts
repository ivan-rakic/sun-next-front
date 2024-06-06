
import { SiFacebook, SiMixcloud, SiInstagram, SiSoundcloud, SiYoutube } from 'react-icons/si';

export const links = [
    { href: '/kosmos-mi', label: 'Kosmos Mi' },
    { href: '/podrzi-sunce', label: 'Podrži Sunce' },
    { href: '/projekti', label: 'Projekti' }
];

export const navLinks = [
    {
        href: 'https://www.facebook.com/sunradio.rs/',
        title: 'Facebook',
        icon: SiFacebook,
        color: '1877f2',
        target: '_blank'
    },
    {
        href: '/kosmos-mi',
        title: 'Mixcloud',
        icon: SiMixcloud,
        color: '52aad8',
    },
    {
        href: '/podcast',
        title: 'Instagram',
        icon: SiInstagram,
        color: 'e1306c',
    },
    {
        href: '/podcast',
        title: 'Soundcloud',
        icon: SiSoundcloud,
        color: 'ff8800',
    },
    {
        href: '/podcast',
        title: 'YouTube',
        icon: SiYoutube,
        color: 'ff0000',
    },
];
