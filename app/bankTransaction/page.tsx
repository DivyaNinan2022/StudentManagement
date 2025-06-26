"use client";
import BankLedgerTable from "@/components/BankLedgerTable";
import TestChild from "@/components/TestChild";
import EnhancedHOC from "@/components/TestChild/TestChild1";
import TestChild1 from "@/components/TestChild/TestChild1";
import EnhancedHOCIn3 from "@/components/TestChild/TestChild3";
import React from "react";

function page() {
  return (
    <div>
      <BankLedgerTable />
    </div>
  );
}

export default page;
