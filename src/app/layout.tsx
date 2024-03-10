import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";

export const metadata = {
  title: "CreatortoolsAI - 1811 Labs Assignment",
  description: "A simple app to help creators with their content",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-Inter">{children}</body>
      <Toaster closeButton position="top-center" richColors  theme="light" />
    </html>
  );
}
