import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";
import SwiperCore, { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ServiceTile from "../components/serviceTile";
import Link from "next/link";

export default function Page() {
  SwiperCore.use([Virtual]);

  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }
  const slides = Array.from({ length: 1000 }).map((_, index) => (
    <Link href="/service">
      <ServiceTile />
    </Link>
  ));

  return (
    <Swiper
      slidesPerView={5}
      // centeredSlides={true}
      spaceBetween={30}
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      virtual
    >
      {slides.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
