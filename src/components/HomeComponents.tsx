"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import React from "react";
import Slider from "react-slick";

interface HomeComponentsProps {
  data: any[];
  displayAll?: boolean;
  displayHome?: boolean;
  displayRecommended?: boolean;
  title: string;
  route?: string;
  rounded?: boolean;
  selectedItem?: String;
  showBtn?: boolean;
}

const HomeComponents = ({
  data,
  displayAll = false,
  displayHome = false,
  displayRecommended = false,
  title,
  route,
  rounded = false,
  selectedItem,
  showBtn = true,
}: HomeComponentsProps) => {
  const [hovered, setHovered] = useState(-1);
  const router = useRouter();

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <>
      {/* Display Data For Desktops */}
      <section className="hidden md:block my-100 mx-5">
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {!displayAll && showBtn ? (
            <span
              className="text-base font-medium text-gray cursor-pointer"
              onClick={() => router.push(`/${route}`)}
            >
              Show all
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6 gap-3">
          {/* Display All Data */}
          {displayAll &&
            data.map((item, index) => (
              <div
                className="p-2 rounded-lg hover:bg-[#1f1f1f] cursor-pointer"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(-1)}
                onClick={() =>
                  router.push(`/${route}/${item.name.replaceAll(" ", "")}`)
                }
                key={item.name}
              >
                <div className="w-full relative aspect-square">
                  <Image
                    src={item.img}
                    fill
                    sizes="100%"
                    className={`${rounded ? "rounded-full" : "rounded-lg"}`}
                    alt="img"
                  />
                  {hovered === index ? (
                    <div className="absolute bottom-2 right-2 bg-black text-primary text-4xl rounded-full">
                      <FaPlayCircle />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="text-lg font-medium mt-2">{item.name}</h1>
                <p className="text-gray">
                  {item.artist ? item.artist : "Artist"}
                </p>
              </div>
            ))}
          {/* Display Data For Home Page */}
          {displayHome &&
            data.map((item, index) =>
              index < 6 ? (
                <div
                  className="p-2 rounded-lg hover:bg-[#1f1f1f] cursor-pointer"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(-1)}
                  onClick={() =>
                    router.push(`/${route}/${item.name.replaceAll(" ", "")}`)
                  }
                  key={item.name}
                >
                  <div className="w-full relative aspect-square">
                    <Image
                      src={item.img}
                      fill
                      sizes="100%"
                      className={`${rounded ? "rounded-full" : "rounded-lg"}`}
                      alt="img"
                    />
                    {hovered === index ? (
                      <div className="absolute bottom-2 right-2 bg-black text-primary text-4xl rounded-full">
                        <FaPlayCircle />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <h1 className="text-lg font-medium mt-2">{item.name}</h1>
                  <p className="text-gray">
                    {item.artist ? item.artist : "Artist"}
                  </p>
                </div>
              ) : (
                ""
              )
            )}
          {/* Display Data That Related to Item Selected */}
          {displayRecommended &&
            data.map((item, index) =>
              item.name !== selectedItem && index < 7 ? (
                <div
                  className="p-2 rounded-lg hover:bg-[#1f1f1f] cursor-pointer"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(-1)}
                  onClick={() =>
                    router.push(`/${route}/${item.name.replaceAll(" ", "")}`)
                  }
                  key={item.name}
                >
                  <div className="w-full relative aspect-square">
                    <Image
                      src={item.img}
                      fill
                      sizes="100%"
                      className={`${rounded ? "rounded-full" : "rounded-lg"}`}
                      alt="img"
                    />
                    {hovered === index ? (
                      <div className="absolute bottom-2 right-2 bg-black text-primary text-4xl rounded-full">
                        <FaPlayCircle />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <h1 className="text-lg font-medium mt-2">{item.name}</h1>
                  <p className="text-gray">
                    {item.artist ? item.artist : "Artist"}
                  </p>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </section>

      {/* Display Data For Phones */}
      <section className="block md:hidden my-100 mx-5">
        <h1 className="text-2xl font-semibold mb-10">{title}</h1>
        <Slider {...settings}>
          {data.map((item, index) =>
            index < 6 ? (
              <div
                className="flex flex-col pe-5 cursor-pointer"
                onClick={() =>
                  router.push(`/${route}/${item.name.replaceAll(" ", "")}`)
                }
                key={index}
              >
                <div className="w-full relative aspect-square">
                  <Image
                    src={item.img}
                    fill
                    sizes="100%"
                    className={`${rounded ? "rounded-full" : "rounded-lg"}`}
                    alt="img"
                  />
                </div>

                <h1 className="text-lg font-medium mt-2">{item.name}</h1>
              </div>
            ) : (
              ""
            )
          )}
        </Slider>
      </section>
    </>
  );
};

export default HomeComponents;
