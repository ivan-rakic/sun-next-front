// @flow
import * as React from 'react';
import {Container} from "@/components/container";
import {featureData, podcastsData} from "@/constants";
import {BlogCard} from "@/app/(root)/_components/blog-card";


export const Podcasts = () => {
    return (
        <div>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {podcastsData.map((card) => (
                        <BlogCard
                            key={card.slug}
                            imageSrc={card.imageSrc}
                            title={card.title}
                            slug={card.slug}
                            author={card.author}
                            timeToRead={card.timeToRead}
                            roundedImage={true}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};
