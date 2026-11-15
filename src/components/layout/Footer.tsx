import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 max-w-6xl mx-auto px-8 mt-14 pt-8 pb-12 border-t border-zinc-800/90 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-[11px] text-zinc-400">
        {/* Col 1: Resource */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs">Resource</h4>
          <p className="leading-relaxed text-[10px] text-zinc-400">
            About, Blockbuster,
            <br />
            Contact US, Forums
            <br />
            ON Movie Indonesia,
            <br />
            Blog, Help Center.
          </p>
        </div>

        {/* Col 2: Legal */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs">Legal</h4>
          <ul className="space-y-1 text-[10px]">
            <li>
              <Link href="#" className="hover:text-white transition">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Privacy Police
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Security
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Account */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs">Account</h4>
          <ul className="space-y-1 text-[10px]">
            <li>
              <Link href="/watchlist" className="hover:text-white transition">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/watchlist" className="hover:text-white transition">
                Watchlist
              </Link>
            </li>
            <li>
              <Link href="/discover" className="hover:text-white transition">
                Collections
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                User Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: NewsLetter */}
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs">NewsLetter</h4>
          <p className="leading-relaxed text-[10px]">
            Subscribe to our newsletter system
            <br />
            now to get latest news from us
            <br />
            Inspired By Pinterest
          </p>
        </div>

        {/* Col 5: IDN Netflix Indonesia */}
        <div className="space-y-2">
          <h4 className="text-white font-normal text-[11px]">
            IDN Netflix Indonesia
          </h4>
          <p className="text-[10px] text-zinc-300">
            Call us (+62) 823 45678910
          </p>
          <p className="text-[11px] text-zinc-200 pt-1">
            @2024 bilqish.i All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
