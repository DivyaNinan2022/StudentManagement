"use client";
import TestChild from "@/components/TestChild";
import EnhancedHOC from "@/components/TestChild/TestChild1";
import TestChild1 from "@/components/TestChild/TestChild1";
import EnhancedHOCIn3 from "@/components/TestChild/TestChild3";
import React from "react";

function page() {
  return (
    <div>
      <TestChild1 name="from page11111111111" />
      {/* <EnhancedHOC name="from page" /> */}
      <EnhancedHOCIn3 name="from page  33333333333" />
    </div>
  );
}

export default page;
