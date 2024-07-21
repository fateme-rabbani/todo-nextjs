import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const statuses = ["todo", "doing", "done"] as const;
export type Status = (typeof statuses)[number];
export interface Task {
  id: number;
  taskDes: string;
  status: Status;
}

export interface Board {
  _id: string;
  des: string;
  tasks: Task[];
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
