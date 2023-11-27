"use client";
import Image from "next/image";
import { useQRCode } from "next-qrcode";
import { useRef, useState } from "react";
import { Dawning_of_a_New_Day } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { colors } from "@/constants";

export default function Home() {
  const { Image: QR } = useQRCode();
  const [download, setDownload] = useState(null);
  const [generate, setGenerate] = useState("");
  const [color, setColor] = useState({ dark: "#2563EB", light: "" });
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    const imgElements = document.querySelectorAll("img");
    if (imgElements.length > 0) {
      const imageUrls = Array.from(imgElements).map(
        (imgElement) => imgElement.src
      );
      console.log("Image URLs:", imageUrls[1]);
      setDownload(imageUrls[1]);
      setGenerate(prompt);
      return imageUrls;
    } else {
      console.log("No img tags found on the page.");
      return [];
    }
  };

  const handleColor = (val) => {
    if (val === 1) {
      setColor({
        dark: "#FF6000",
        light: "#FFF",
      });
      setDownload(null);
    }
    if (val === 2) {
      setColor({
        dark: "#D80032",
        light: "#FFF",
      });
      setDownload(null);
    }
    if (val === 3) {
      setColor({
        dark: "#E7B10A",
        light: "#FFF",
      });
      setDownload(null);
    }
  };

  return (
    <main className="md:w-700px mx-auto bg-background min-h-screen flex flex-col items-center justify-center  relative top-0">
      <Image
        src="/back.jpg"
        width={826}
        height={465}
        className=" top-0 left-0  object-cover object-center w-full opacity-50 h-full absolute"
        alt="qrcode"
      />
      <div className="z-[10] flex flex-col items-center justify-center space-y-10">
        <h1 className=" text-6xl font-semibold">
          {" "}
          <span className="text-primary">QR</span> Generator
        </h1>

        <div>
          <QR
            text={generate || "https://github.com/bunlong/next-qrcode"}
            options={{
              type: "image/jpeg",
              quality: 0.3,
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: color.dark,
                light: color.light,
              },
            }}
          />
        </div>
        <div>
          <Input
            type="text"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setDownload(null);
            }}
            placeholder="Enter your Url / Message"
          />
        </div>
        <div className="flex space-x-4">
          <div
            className="h-6 w-6 rounded-full bg-[#FF6000]"
            onClick={() => handleColor(1)}
          ></div>
          <div
            className="h-6 w-6 rounded-full bg-[#D80032]"
            onClick={() => handleColor(2)}
          ></div>
          <div
            className="h-6 w-6 rounded-full bg-yellow-700"
            onClick={() => handleColor(3)}
          ></div>
        </div>
        <div className="space-x-4">
          {prompt.length > 0 ? (
            <Button className="bg-foreground" onClick={handleGenerate}>
              Generate
            </Button>
          ) : (
            <Button className="bg-zinc-400 hover:bg-zinc-400">Generate</Button>
          )}

          {download !== null ? (
            <a
              href={download}
              download
              className="py-2.5 px-4 rounded-md bg-primary text-white"
            >
              Download
            </a>
          ) : (
            <Button className="bg-zinc-400 hover:bg-zinc-400 cursor-not-allowed ">
              Download
            </Button>
          )}
        </div>
      </div>
      <p className="text-gray-700 mt-4 text-sm">
        * Click on generate to download image
      </p>
    </main>
  );
}
