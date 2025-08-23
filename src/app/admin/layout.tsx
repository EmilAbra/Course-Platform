import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function Navbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10 px-2">
      <nav className="flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link href="/" className="text-lg hover:underline px-2">
            EA School
          </Link>
          <Badge>Admin</Badge>
        </div>
        <Link
          className="flex items-center px-2 hover:bg-accent/10"
          href="/admin/courses"
        >
          Courses
        </Link>
        <Link
          className="flex items-center px-2 hover:bg-accent/10"
          href="/admin/products"
        >
          Products
        </Link>
        <Link
          className="flex items-center px-2 hover:bg-accent/10"
          href="/admin/sales"
        >
          Sales
        </Link>
        <div className="size-8 self-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "100%", height: "100%" },
              },
            }}
          ></UserButton>
        </div>
      </nav>
    </header>
  );
}
