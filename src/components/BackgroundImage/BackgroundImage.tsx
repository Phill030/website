import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type BackgroundImageProps = {
  src: string | StaticImport;
  alt: string;
  filter?: string;
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
      {/* Background image */}
      <Image src={src} alt={alt} fill style={{ objectFit: "cover", filter }} quality={100} draggable={draggable} />

      {/* Dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #ffffff33 1px, transparent 2px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, #4acc3930, transparent)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
