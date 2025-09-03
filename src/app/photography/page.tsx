"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./page.module.scss";
import NavBar from "@/components/NavBar/NavBar";

import Footer from "@/components/Footer/Footer";
import DisplayImage from "@/components/DisplayImage/DisplayImage";

// Images
import img1 from "~/public/photos/IMG_5264.jpg";
import img2 from "~/public/photos/IMG_5270.jpg";
import img3 from "~/public/photos/IMG_5274.jpg";
import img4 from "~/public/photos/IMG_5278.jpg";
import img5 from "~/public/photos/IMG_5279.jpg";
import img6 from "~/public/photos/IMG_5280.jpg";
import img7 from "~/public/photos/IMG_5284.jpg";
import img8 from "~/public/photos/IMG_5292.jpg";
import img9 from "~/public/photos/IMG_5294.jpg";
import img10 from "~/public/photos/IMG_5304.jpg";
import img11 from "~/public/photos/IMG_5309.jpg";
import img12 from "~/public/photos/IMG_5327.jpg";
import img13 from "~/public/photos/IMG_5335.jpg";
import img14 from "~/public/photos/IMG_5365.jpg";
import img15 from "~/public/photos/IMG_5369.jpg";
import img16 from "~/public/photos/IMG_5376.jpg";

type Image = {
  src: StaticImageData;
  alt: string;
};

const images: Image[] = [
  {
    src: img1,
    alt: "Landgrafenschloss",
  },
  {
    src: img2,
    alt: "Marburg",
  },
  {
    src: img3,
    alt: "Parkhaus",
  },
  {
    src: img4,
    alt: "Regionalexpress 146 251",
  },
  {
    src: img8,
    alt: "Sophie-von-Brabant-Schule",
  },
  {
    src: img11,
    alt: "Alter Botanischer Garten",
  },
  {
    src: img12,
    alt: "Rathaus Marburg",
  },
  {
    src: img9,
    alt: "Mini",
  },
  {
    src: img10,
    alt: "Alter Botanischer Garten",
  },
  {
    src: img13,
    alt: "Oberstadt Marburg",
  },
  {
    src: img5,
    alt: "Hbf. Marburg",
  },
  {
    src: img14,
    alt: "Hbf. Marburg Gleis 5",
  },
  {
    src: img15,
    alt: "Parkdeck Marburg",
  },
  {
    src: img16,
    alt: "RE97 Marburg (Lahn)",
  },
  {
    src: img6,
    alt: "RE98 nach Gießen",
  },
  {
    src: img7,
    alt: "Ludwig-Schuler-Brücke",
  },
];

export default function Page() {
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextImage = () => {
    if (currentImage === null) return;

    const nextIndex = (currentImage + 1) % images.length;
    setCurrentImage(nextIndex);
    setIsLoading(true);
  };

  const prevImage = () => {
    if (currentImage === null) return;

    const prevIndex = (currentImage - 1 + images.length) % images.length;
    setCurrentImage(prevIndex);
    setIsLoading(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentImage) {
        if (e.key === "Escape") {
          setCurrentImage(null);
          setIsLoading(false);
        }
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentImage]);

  return (
    <div className={styles.page}>
      <NavBar />
      <div className={styles.gradient} />
      {typeof window !== "undefined" && window.innerWidth > 768 && (
        <>
          <div className={styles.movingGradient1} />
          <div className={styles.movingGradient2} />
          <div className={styles.movingGradient3} />
          <div className={styles.movingGradient4} />
        </>
      )}

      <main>
        <div className={styles.masonryGrid}>
          {images.map((image, idx) => (
            <DisplayImage
              key={idx}
              src={image.src}
              alt={image.alt}
              onClick={() => {
                setCurrentImage(idx);
                setIsLoading(true);
              }}
            />
          ))}
        </div>
      </main>

      {currentImage !== null && (
        <div className={styles.modalBackground} onClick={() => setCurrentImage(null)}>
          {isLoading && <span className={styles.loader} />}
          <div
            className={`${styles.imageHolder} ${
              images[currentImage].src.width > images[currentImage].src.height ? styles.landscape : styles.portrait
            }`}
          >
            <Image
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className={styles.enlargedImage}
              quality={100}
              onLoadingComplete={() => setIsLoading(false)}
            />
            {!isLoading && <p>Copyright © Phill030 - {images[currentImage].alt}</p>}
          </div>
        </div>
      )}

      <Footer style={{ justifySelf: "center" }} />
    </div>
  );
}
