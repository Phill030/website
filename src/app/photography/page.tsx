import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import bgImage from "~/public/photos/IMG_5280.jpg";
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
import img8 from "~/public/photos/IMG_5294.jpg";
import img9 from "~/public/photos/IMG_5327.jpg";
import img10 from "~/public/photos/IMG_5365.jpg";
import img11 from "~/public/photos/IMG_5369.jpg";
import img12 from "~/public/photos/IMG_5376.jpg";
import { Metadata } from "next";
import { SearchParams } from "next/dist/server/request/search-params";

const images = [
  { query: "img1", src: img1, alt: "Landgrafenschloss" },
  { query: "img2", src: img2, alt: "Marburg" },
  { query: "img3", src: img3, alt: "Parkdeck" },
  { query: "img4", src: img4, alt: "Regionalexpress 146 251" },
  { query: "img5", src: img5, alt: "Hbf. Marburg" },
  { query: "img6", src: img6, alt: "RE98 nach Gießen" },
  { query: "img7", src: img7, alt: "Ludwig-Schuler-Brücke" },
  { query: "img8", src: img8, alt: "Mini" },
  { query: "img9", src: img9, alt: "Rathaus" },
  { query: "img10", src: img10, alt: "Hbf. Marburg Gleis 5" },
  { query: "img11", src: img11, alt: "Hbf. Parkdeck" },
  { query: "img12", src: img12, alt: "RE97 Marburg (Lahn)" },
];

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const imgParam = searchParams?.img;
  const image = images.find((img) => img.query === imgParam);

  if (image) {
    return {
      title: `Phill030 | Photography - ${image.alt}`,
      description: `View the photo: ${image.alt}`,
      openGraph: {
        title: `Phill030 | Photography - ${image.alt}`,
        description: `View the photo: ${image.alt}`,
        images: [
          {
            url: image.src.src,
            alt: image.alt,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Phill030 | Photography - ${image.alt}`,
        description: `View the photo: ${image.alt}`,
        images: [image.src.src],
      },
    };
  }

  return {
    title: "Phill030 | Photography",
    description: "Explore my photography collection.",
    openGraph: {
      title: "Phill030 | Photography",
      description: "Explore my photography collection.",
      images: [
        {
          url: bgImage.src,
          width: 1200,
          height: 630,
          alt: "Photography Collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Phill030 | Photography",
      description: "Explore my photography collection.",
      images: [bgImage.src],
    },
  };
}

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <BackgroundImage src={bgImage} alt="Background image" filter="brightness(40%)" />

      <main>
        <div className={styles.gridContainer}>
          <h1>Photography</h1>
          {images.map((img) => (
            <div key={img.query} className={styles.item}>
              <DisplayImage src={img.src} alt={img.alt} query={img.query} />
            </div>
          ))}

          {/* <div className={`${styles.item} ${styles.doubleSize}`}>
            <h2>Camera</h2>
            <p>I'm using a Canon EOS 550D blablabla blebleble blobloblo blublublu hu blublublublublu blub blu blu blu blu blu blublublu blu</p>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
