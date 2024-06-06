import { RiPlanetLine, RiAliensLine, RiSunLine, RiSoundModuleLine } from 'react-icons/ri';

export const getIconComponent = (slug:string) => {
    switch (slug) {
        case 'portal':
            return RiPlanetLine;
        case 'kosmos-mi':
            return RiAliensLine;
        case 'podrzi-sunce':
            return RiSunLine;
        case 'projekti':
            return RiSoundModuleLine;
        default:
            return null;
    }
};
