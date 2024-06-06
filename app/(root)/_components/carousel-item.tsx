import Image from "next/image";

type Props = {
    name: string, desc: string, stat: string, src: string,
};
export const CarouselItem = ({ name, desc, stat, src }: Props) => {
    return (
        <div className='alice-carousel__stage-div'>
            <p className='alice-carousel__stage-r-name'>{name}</p>
            <p className='alice-carousel__stage-r-desc'>{desc}</p>
            <p className='alice-carousel__stage-r-stat'>{stat}</p>
            <div className='alice-carousel__stage-imageDiv'>
                <Image src={src} alt='test' width={50}/>
            </div>
        </div>
    );
};
