"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./DisplayImage.module.scss";
import Image from "next/image";
import { useState } from "react";

type DisplayImageProps = {
  src: string | StaticImport;
  alt: string;
};

export default function DisplayImage({ src, alt }: DisplayImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [isModalLoaded, setIsModalLoaded] = useState(false);

  return (
    <div className={styles.displayImage}>
      <Image
        src={src}
        alt={alt}
        quality={10}
        draggable={false}
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "5px",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
        onClick={() => {
          openModal();
          setIsHovered(false);
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <p className={`${styles.imageName} ${isHovered ? styles.visible : styles.hidden}`}>{alt}</p>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          onClick={() => {
            closeModal();
            setIsModalLoaded(false);
          }}
          className={styles.modalBackground}
        >
          <div>
            {!isModalLoaded ? <span className={styles.loader} /> : null}
            <Image
              draggable={false}
              onLoad={() => {
                setIsModalLoaded(true);
              }}
              quality={100}
              className={styles.enlargedImage}
              src={src}
              alt={alt}
            />
            {isModalLoaded ? <p>Copyright © Phill030 - {alt}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
}
