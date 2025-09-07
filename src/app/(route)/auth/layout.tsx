export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: "url('/Event.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Foreground (all page content) */}
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          {children}
        </div>
    </div>
  );
}
