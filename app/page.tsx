import Image from "next/image";
import Link from "next/link";
import pic from "../assets/img/1.jpg";
export default async function Page() {
  return (
    <div className="h-full">
      <Image style={{ width: "100%", height: "100%" }} src={pic} alt="" />
      <div className="absolute top-0 flex flex-col justify-between bg-violet-500 h-full p-5 rounded-r">
        <div className="flex flex-col gap-5">
          <Link href="/gallery">
            <div className="text-slate-50">gallery</div>
          </Link>
          <Link href="/boards">
            <div className="text-slate-50">boards</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
