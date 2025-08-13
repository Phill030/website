import Image from "next/image";
import Header from "@/components/Header/Header";
import styles from "./page.module.scss";

// Images
import backgroundImage from "~/public/photos/IMG_5279.jpg";
import server1 from "~/public/hardware/hpe_microserver_gen10_front_with_bezel.png";
import server2 from "~/public/hardware/fujitsu_rx_1330_m1.png";
import Footer from "@/components/Footer/Footer";
import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <BackgroundImage src={backgroundImage} alt="Background image" />

      <main>
        <div className={styles.gridContainer}>
          <h1>My Server Hardware</h1>
          <div className={styles.item}>
            <h2>HPE MicroServer Gen10</h2>
            <Image
              src={server1}
              alt="HPE MicroServer Gen10"
              quality={100}
              draggable={false}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "auto",
                padding: "10px",
              }}
            />
            <div className={styles.specs}>
              <h3>Specifications</h3>
              <ul>
                <li>
                  <strong>CPU:</strong> AMD Opteron X3216 (2 cores, 1.6 GHz)
                </li>
                <li>
                  <strong>RAM:</strong> 16GB DDR4 ECC
                </li>
                <li>
                  <strong>Storage:</strong> 2 x 2TB HDD (Mirror) & 2x 1TB HDD (Mirror)
                </li>
                <li>
                  <strong>Network:</strong> Dual Gigabit Ethernet (LACP)
                </li>
                <li>
                  <strong>Power:</strong> 200W PSU
                </li>
                <li>
                  <strong>OS:</strong> TrueNas Scale 24.10
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.item}>
            <h2>Fujitsu Primergy RX 1330 M1</h2>
            <Image
              src={server2}
              alt="Fujitsu Primergy RX 1330 M1"
              quality={100}
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "auto",
                padding: "10px",
              }}
              draggable={false}
            />
            <div className={styles.specs}>
              <h3>Specifications</h3>
              <ul>
                <li>
                  <strong>CPU:</strong> Intel Xeon E3-1246v3 (4 cores, 3.5 GHz)
                </li>
                <li>
                  <strong>RAM:</strong> 8GB DDR3 ECC
                </li>
                <li>
                  <strong>Storage:</strong> 2 x 1TB SSD (Stripe) (Samsung 870QVO)
                </li>
                <li>
                  <strong>Network:</strong> Dual Gigabit Ethernet
                </li>
                <li>
                  <strong>Power:</strong> 2x Redundant 450W PSU
                </li>
                <li>
                  <strong>OS:</strong> VMware ESXi 8.0
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.item} ${styles.doubleSize}`}>
            <h2>Gallery</h2>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
