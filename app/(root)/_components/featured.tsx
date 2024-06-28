import * as React from "react";
import { Container } from "@/components/container";
import { FeaturedCard } from "./featured-card";
import { featureData } from "@/constants";

export const Featured = () => {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
          {featureData.map((card) => (
            <FeaturedCard
              key={card.slug}
              imageSrc={card.imageSrc}
              title={card.title}
              slug={card.slug}
              author={card.author}
              category={undefined}
              roundedImage={true}
              isPrimary={card.isPrimary}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
