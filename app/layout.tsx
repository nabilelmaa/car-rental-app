import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Rahioui Cars",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="relative">
          <NavBar />
          <SignedIn>{children}</SignedIn>
          <SignedOut>
            <SignedIn />
          </SignedOut>
          <div
            className="mt-12 padding-x padding-y max-width"
            id="discover"
          ></div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}