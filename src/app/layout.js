import "./globals.css";

export const metadata = {
  title: "Gulamgous Khan | Full Stack AI/ML Engineer Portfolio",
  description: "Step into the digital universe of Gulamgous Khan, Full Stack AI/ML Engineer and CSE Graduate. Experience an immersive 3D AI and Web Development journey.",
  keywords: ["Gulamgous Khan", "Full Stack AI/ML Engineer", "3D Portfolio", "React Three Fiber", "Gen AI", "MERN Stack", "LeetCode", "Google 2027"],
  authors: [{ name: "Gulamgous Khan" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#030014] text-white">
        {children}
      </body>
    </html>
  );
}
