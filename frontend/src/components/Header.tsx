import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <nav className="flex gap-4">
            <Link
              href="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Home
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/cart">
              <Image src={"/cart.png"} alt="cart" width={20} height={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
