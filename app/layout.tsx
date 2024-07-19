import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { BoardProvider } from "@/contexts/board";
import connectDB from "@/utils/connectDB";
import Board from "@/models/Board";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await connectDB();
  // const boards = await Board.find();

  return (
    <html lang="en">
      {/* <BoardProvider {...{ boards }}> */}
      <body className={inter.className}>{children}</body>
      {/* </BoardProvider> */}
    </html>
  );
}
