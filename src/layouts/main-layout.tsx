import React, { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Helmet defaultTitle="Eagle Transportes" title="Eagle Transportes">
        {/* Basic favicons */}
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />

        {/* Apple Touch Icons */}
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />

        {/* Android/Chrome */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />

        {/* Microsoft Tiles */}
        <link
          rel="msapplication-TileImage"
          sizes="70x70"
          href="/ms-icon-70x70.png"
        />
        <link
          rel="msapplication-TileImage"
          sizes="144x144"
          href="/ms-icon-144x144.png"
        />
        <link
          rel="msapplication-TileImage"
          sizes="150x150"
          href="/ms-icon-150x150.png"
        />
        <link
          rel="msapplication-TileImage"
          sizes="310x310"
          href="/ms-icon-310x310.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="browserconfig.xml" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Global CSS */}
        <link rel="stylesheet" href="/src/global.css" />
      </Helmet>
      {children}
    </>
  );
};
