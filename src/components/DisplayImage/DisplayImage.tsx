"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./DisplayImage.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type DisplayImageProps = {
  src: string | StaticImport;
  alt: string;
  query?: string;
};

export default function DisplayImage({ src, alt, query }: DisplayImageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    router.push(`?img=${query}`, { scroll: false });
  };
  const closeModal = () => {
    setIsOpen(false);
    router.push("/photography", { scroll: false });
  };

  const [isModalLoaded, setIsModalLoaded] = useState(false);

  useEffect(() => {
    const imgParam = searchParams.get("img");
    if (imgParam === query) {
      setIsOpen(true);
    }
  }, [searchParams, query]);

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
