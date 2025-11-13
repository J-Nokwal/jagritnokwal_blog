import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSanityImageConfig } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  asset: SanityImageSource;
  alt: string;
  caption?: string;
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props;
  // const imageProps = useNextSanityImage(getSanityImageConfig(), asset)

  // if (!imageProps) return null

  return (
    <figure>
      <Image
        src={urlFor(asset).maxWidth(800).quality(80).auto("format").url()}
        alt={alt}
        sizes="(max-width: 800px) 100vw, 800px"
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
        // {...imageProps}
        // fill={}
      />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
