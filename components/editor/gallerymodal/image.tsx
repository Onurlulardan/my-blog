import CheckMark from "@/components/common/checkmark";
import NextImage from "next/image";
import React, { FC } from "react";

interface Props {
  src: string;
  selected?: boolean;
  onClick?: () => void;
  alt?: string;
}

const Image: FC<Props> = ({ src, selected, onClick, alt }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative  rounded overflow-hidden cursor-pointer "
    >
      <NextImage
        src={src}
        width={200}
        height={200}
        alt={alt as any}
        style={{ objectFit: "cover", height: "200px" }}
        className="bg-secondary-light hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
