import React from "react";
import Hero from "../sections/Hero";
import Capabilities from "../sections/Capabilities";
import Work from "../sections/Work";
import Showreel from "../sections/Showreel";
import Principles from "../sections/Principles";
import Screens from "../sections/Screens";
import Stack from "../sections/Stack";
import Journey from "../sections/Journey";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Capabilities />
      <Showreel />
      <Principles />
      <Screens />
      <Stack />
      <Journey />
      <Contact />
    </>
  );
}
