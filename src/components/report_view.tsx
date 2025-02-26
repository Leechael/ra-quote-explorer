"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { type TDXQuote } from "@/types";
import { DcapVerifyForm } from "./onchain_attestation";
import { ReportDetail } from "./report_detail";

export function ReportView({
  report,
  checksum,
}: { report: TDXQuote; checksum: string }) {
  const [activeView, setActiveView] = useState<"report" | "attestation">(
    "report",
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 pb-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
            >
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">
              TEE Attestation Explorer
            </h1>
          </div>

          {activeView === "report" && report.can_download && (
            <Button
              onClick={() => setActiveView("attestation")}
              className="mt-4 md:mt-0 gap-2 inline-flex flex-row items-center border border-black"
              variant="secondary"
            >
              <Bot className="h-4 w-4" />
              <span>Onchain attestation</span>
            </Button>
          )}
        </div>

        {activeView === "attestation" && (
          <div className="mb-6">
            <Tabs
              value={activeView}
              onValueChange={(value) =>
                setActiveView(value as "report" | "attestation")
              }
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="report" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Report View
                </TabsTrigger>
                <TabsTrigger value="attestation" className="gap-2">
                  <Bot className="h-4 w-4" />
                  Onchain Attestation
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="rounded-lg shadow-sm">
          {activeView === "report" ? (
            <ReportDetail report={report} />
          ) : (
            <DcapVerifyForm checksum={checksum} />
          )}
        </div>
        <footer className="mt-4">
          <div className="flex flex-inline gap-1.5 justify-center items-center">
            <img src="/apple-touch-icon.png" className="w-5 h-5 rounded-full overflow-hidden" />
            <p className="text-gray-500 text-sm">Developed by the <a href="https://phala.network" target="_blank" className="underline">Phala team</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}
