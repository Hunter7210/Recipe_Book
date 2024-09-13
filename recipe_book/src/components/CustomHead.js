// components/GlobalHead.js
import Head from 'next/head';

const CustomHead = ({ title = "MyRecipeBook" }) => (
  <Head>
    <title>{title}</title>
    <link rel="stylesheet" href="/styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Climate+Crisis&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
  </Head>
);

export default CustomHead;
