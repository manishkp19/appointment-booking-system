'use client'

import Link from "next/link";
import { Breadcrumb } from "flowbite-react";
import { usePathname } from 'next/navigation'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const breadCrumbText = pathname.replace('/', '');
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex `}
      >
        <div className="min-h-full h-full w-full">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="shrink-0 text-white w-20">
                    <Link href="/">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 122 36" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img">
                        <path d="M0 1.19971H18.9662V6.14902H6.43039V11.5394H17.4897V16.5723H6.42575V21.9627H18.9615V26.912H0V1.19971Z" fill="currentColor"></path>
                        <path d="M22.2378 7.98816H28.2271L28.4268 9.62709C29.2532 9.04209 30.2561 8.55459 31.44 8.16923C32.6239 7.78387 33.8404 7.58887 35.0939 7.58887C37.5175 7.58887 39.2911 8.17387 40.424 9.34388C41.5568 10.5139 42.1186 12.3246 42.1186 14.776V26.9125H35.6882V15.296C35.6882 14.2328 35.4561 13.4714 34.9872 13.021C34.5229 12.5707 33.715 12.3432 32.5728 12.3432C31.8811 12.3432 31.1753 12.501 30.4557 12.8214C29.7361 13.1418 29.1371 13.541 28.6589 14.0193V26.9172H22.2285V7.98816H22.2378Z" fill="currentColor"></path>
                        <path d="M46.2 7.98816H51.79L52.1103 9.62709C53.7586 8.27137 55.7457 7.58887 58.0579 7.58887C63.8893 7.58887 66.8004 10.7414 66.8004 17.0511C66.8004 20.4032 66.0018 22.9522 64.4047 24.6979C62.8075 26.4436 60.5836 27.3118 57.7375 27.3118C55.7411 27.3118 54.0371 26.8986 52.6257 26.0722V35.5344H46.1953V7.98816H46.2ZM59.1954 21.1647C59.9011 20.2082 60.254 18.7968 60.254 16.9303C60.254 15.1753 59.9429 13.9635 59.3161 13.295C58.6893 12.631 57.6586 12.2967 56.2193 12.2967C54.8636 12.2967 53.6657 12.775 52.6257 13.736V21.4014C53.1596 21.8007 53.6843 22.0979 54.2043 22.3022C54.7243 22.5018 55.3557 22.5993 56.0986 22.5993C57.4589 22.6039 58.4897 22.1211 59.1954 21.1647Z" fill="currentColor"></path>
                        <path d="M71.3709 25.7738C70.108 24.7477 69.4766 23.2759 69.4766 21.3631C69.4766 19.3945 70.1498 17.8623 71.4916 16.7713C72.8334 15.6802 74.7973 15.1323 77.3834 15.1323H82.6531V14.6959C82.6531 13.7116 82.3281 13.0198 81.6734 12.6205C81.0188 12.2212 79.8302 12.0216 78.0984 12.0216C75.9441 12.0216 73.8269 12.3559 71.7516 13.0198V8.86908C72.708 8.49765 73.8687 8.19122 75.2244 7.94979C76.5802 7.70836 77.9777 7.59229 79.417 7.59229C82.4256 7.59229 84.7424 8.20514 86.3627 9.43087C87.9877 10.6566 88.8002 12.5462 88.8002 15.0998V26.9206H83.1684L82.8481 25.3234C81.3856 26.656 79.1616 27.3199 76.1809 27.3199C74.2355 27.3106 72.6337 26.7999 71.3709 25.7738ZM82.6484 21.5209V18.8466H78.0984C77.142 18.8466 76.427 19.0323 75.9627 19.4038C75.4984 19.7752 75.2662 20.3509 75.2662 21.1216C75.2662 22.612 76.2505 23.3595 78.2191 23.3595C80.132 23.3595 81.6131 22.7466 82.6484 21.5209Z" fill="currentColor"></path>
                        <path d="M94.3616 25.9537C93.4562 25.0483 93.0059 23.5998 93.0059 21.6033V0H99.4362V20.9626C99.4362 21.5755 99.557 21.9933 99.7937 22.2208C100.035 22.4483 100.421 22.5598 100.95 22.5598C101.669 22.5598 102.306 22.4669 102.867 22.2812V26.6316C102.227 26.873 101.609 27.0448 101.01 27.1516C100.411 27.2584 99.687 27.3094 98.8327 27.3094C96.7573 27.3094 95.2623 26.8591 94.3616 25.9537Z" fill="currentColor"></path>
                        <path d="M117.144 28.0884C119.826 28.0884 122 25.9141 122 23.2319C122 20.5498 119.826 18.3755 117.144 18.3755C114.461 18.3755 112.287 20.5498 112.287 23.2319C112.287 25.9141 114.461 28.0884 117.144 28.0884Z" fill="#FFC700"></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link href="/customer" className={`${breadCrumbText === 'customer' ? 'bg-gray-600' : ''} rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>Customer</Link>
                      <Link href="/manager" className={`${breadCrumbText === 'manager' ? 'bg-gray-600' : ''} rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>Manager</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <header className="bg-white shadow">
            <Breadcrumb className="m-4">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item className="capitalize">{breadCrumbText}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Appointment booking system</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
