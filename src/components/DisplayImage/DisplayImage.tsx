import styles from "./DisplayImage.module.scss";
import Image, { StaticImageData } from "next/image";

type DisplayImageProps = {
  src: string | StaticImageData;
  alt: string;
  onClick: () => void;
};

export default function DisplayImage({ src, alt, onClick }: DisplayImageProps) {
  return (
    <div className={styles.imageContainer} onClick={onClick}>
      <Image src={src} alt={alt} quality={10} draggable={false} className={styles.image} />

      {/* Overlay for hovering text */}
      <div className={styles.overlay}>
        <p className={styles.imageName}>{alt}</p>
      </div>
    </div>
  );
}
