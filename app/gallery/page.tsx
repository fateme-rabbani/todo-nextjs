import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

import pic from "../../assets/img/1.jpg";

const galleryList = [
  {
    title: "aaaa",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
  {
    title: "bbbbb",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
  {
    title: "xxxxx",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
  {
    title: "gggg",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
  {
    title: "mmmm",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
  {
    title: "ppppp",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue",
    img: pic,
  },
];

const GalleryList: FC = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <span className="text-violet-700 py-5 text-3xl font-bold">Gallery</span>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-10">
        {galleryList.map((item, i) => (
          <Link key={i} href={`/gallery/${item.title}`}>
            <div
              key={i}
              className="bg-gradient-to-t from-slate-600 flex flex-col bg-violet-700 p-5 rounded hover:rotate-6 transition-all .5s"
            >
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 5 }}
                src={item.img}
                alt=""
              />

              <span className="flex items-center gap-1 text-xl text-slate-50 font-bold">
                <span className="block w-3 h-3 bg-violet-200 rounded-full"></span>{" "}
                {item.title}
              </span>
              <span className="text-slate-50">{item.des}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryList;
