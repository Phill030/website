import Header from "@/components/Header/Header";
import styles from "./page.module.scss";
import bgImage from "~/public/photos/IMG_5280.jpg";
import Footer from "@/components/Footer/Footer";
import DisplayImage from "@/components/DisplayImage/DisplayImage";
import { Metadata } from "next";
import { Suspense } from "react";

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
import img13 from "~/public/photos/IMG_5304.jpg";
import img14 from "~/public/photos/IMG_5309.jpg";

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
  { query: "img13", src: img13, alt: "Alter Botanischer Garten" },
  { query: "img14", src: img14, alt: "Alter Botanischer Garten" },
];

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const imgParam = (await searchParams)?.img;
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
            url: `${process.env.NEXT_PUBLIC_BASE_URL}${image.src.src}`,
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
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}${image.src.src}`],
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
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${bgImage.src}`,
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
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}${bgImage.src}`],
    },
  };
}

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />

      <main>
        <div className={styles.gridContainer}>
          <h1>Photography</h1>
          {images.map((img) => (
            <div key={img.query} className={styles.item}>
              <Suspense>
                <DisplayImage src={img.src} alt={img.alt} query={img.query} />
              </Suspense>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
