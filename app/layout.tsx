import { Inter } from "next/font/google";

import "./globals.css";

import { Types } from "mongoose";

const inter = Inter({ subsets: ["latin"] });

export interface Task {
  _id: Types.ObjectId;
  taskDes: string;
}
export interface Column {
  _id: Types.ObjectId;
  name: string;
  tasks: Task[];
}
export interface Board {
  _id: Types.ObjectId;
  name: string;
  columns: Column[];
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
