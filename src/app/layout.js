import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <h1>Social Network</h1>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <nav>
            <Link href="/">Home</Link> | <Link href="/posts">Posts</Link> |{" "}
            <Link href="/profile">Profile</Link> |{" "}
          </nav>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
