"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NormalCardProps {
  title: string;
  description: string;
  ImageSrc: string;
  redirectTo: string;
}

export const ReusableCard = ({
  title,
  description,
  ImageSrc,
  redirectTo,
}: NormalCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-xl"
    >
      <div className="h-96 w-72">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          src={ImageSrc}
          alt=""
          width={288}
          height={384}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-dmserif text-3xl font-bold text-white">{title}</h1>
        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {description}
        </p>
        <button className="rounded-full bg-neutral-900 px-3.5 py-2 font-com text-sm capitalize text-white shadow shadow-black/60">
          Go to {title}
        </button>
      </div>
    </div>
  );
};
