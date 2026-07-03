import "./globals.css";

export const metadata = {
  title: "Nikita Jamodkar | Cinematic 3D Developer Portfolio",
  description: "Step into the digital universe of Nikita Jamodkar, Computer Science student, developer, and designer. Experience an immersive 3D frontend journey.",
  keywords: ["Nikita Jamodkar", "3D Portfolio", "React Three Fiber", "Web Developer", "Computer Science", "GSAP ScrollTrigger"],
  authors: [{ name: "Nikita Jamodkar" }],
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
