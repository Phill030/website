"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./NowPlaying.module.scss";

const NeonPills = ({ title, artist }: { title: string; artist: string }) => {
  // Generate an array of 10 random heights between 5 and 40
  const heights = useMemo(() => {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * (40 - 5 + 1)) + 5);
  }, [title, artist]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // vertically center pills
        gap: "1px",
      }}
    >
      {heights.map((height, index) => (
        <div
          key={index}
          className={styles.pill}
          style={{
            width: "5px",
            height: `${height}px`,
            borderRadius: "50px", // pill shape
            backgroundColor: "#55FC98", // neon green
            // boxShadow: "0 0 8px #39FF14, 0 0 15px #39FF14, 0 0 20px #39FF14",
          }}
        />
      ))}
    </div>
  );
};

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}

export default function NowPlaying() {
  const [progressMs, setProgressMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songUrl, setSongUrl] = useState("");
  const [albumImageUrl, setAlbumImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const clearProgressInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const startProgressInterval = (duration: number) => {
    clearProgressInterval(); // Clear any existing interval first

    progressInterval.current = setInterval(() => {
      setProgressMs((prev) => {
        if (prev + 1000 >= duration) {
          clearProgressInterval();
          return duration;
        }
        return prev + 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    const ev = new EventSource("/api/spotify/stream");

    ev.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      const pTitle = parsed.item.name;
      const pArtist = parsed.item.artists[0].name;
      const pDurationMs = parsed.item.duration_ms;
      const pProgressMs = parsed.progress_ms;

      if (pArtist == artist && pTitle == title) {
        if (Math.abs(parsed.progress_ms - progressMs) > 4000) {
          setProgressMs(parsed.progress_ms);
          return;
        }
      } else {
        if (parsed.is_playing && !progressInterval.current) {
          startProgressInterval(pDurationMs);
        } else if (!parsed.is_playing) {
          clearProgressInterval();
        }
      }

      setProgressMs(pProgressMs);
      setDurationMs(pDurationMs);
      setIsPlaying(parsed.is_playing);
      setSongUrl(parsed.item.external_urls.spotify);
      setAlbumImageUrl(parsed.item.album.images[0].url);
      setTitle(pTitle);
      setArtist(pArtist);
    };

    ev.onerror = () => {
      return <p>Error loading song information</p>;
    };

    return () => {
      ev.close();
    };
  }, []);

  if (artist.length < 1) return <p>Loading...</p>;
  if (!isPlaying) return <p>Not playing</p>;

  return (
    <div className={styles.nowPlaying}>
      <img src={albumImageUrl} alt={title} width={50} height={50} />
      <div className={styles.info}>
        <a href={songUrl} rel="noopener noreferrer" target="_blank" className={styles.title}>
          {title}
        </a>
        <p className={styles.artist}>{artist}</p>
        <div className={styles.pills}>
          <NeonPills title={title} artist={artist} />
        </div>
        <p className={styles.progressTime}>
          {formatTime(progressMs)} / {formatTime(durationMs)}
        </p>
      </div>
    </div>
  );
}
