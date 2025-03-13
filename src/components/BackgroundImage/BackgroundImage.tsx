import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type BackgroundImageProps = {
  src: string | StaticImport;
  alt: string;
  filter?: string | undefined;
  draggable?: boolean;
};

export default function BackgroundImage({ src, alt, filter = "brightness(40%)", draggable = false }: BackgroundImageProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="cover" quality={100} style={{ filter }} draggable={draggable} />
    </div>
  );
}
