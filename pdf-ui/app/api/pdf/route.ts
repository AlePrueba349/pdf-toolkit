import { NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";
import JSZip from "jszip";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";

export const runtime = "nodejs";
const GS = process.platform === "win32" ? "gswin64c" : "gs";

const execAsync = promisify(exec);

// Función utilitaria para transformar cualquier Uint8Array/Buffer en un Stream compatible con BodyInit
function bytesToStream(bytes: Uint8Array): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const action = formData.get("action") as string;
    const rotationAngle = Number(formData.get("rotationAngle") || 90);

    console.log("ACTION:", action);
    console.log("FILES:", files.length);

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const pdfDocs = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();

        try {
          return await PDFDocument.load(bytes, {
            ignoreEncryption: false,
          });
        } catch {
          throw new Error(
            "El PDF está encrypyado y no puede procesarse."
          );
        }
      })
    );

    // -------------------
    // ACCIÓN: SPLIT (Retorna ZIP)
    // -------------------
    if (action === "split") {
      const zip = new JSZip();
      const doc = pdfDocs[0];
      const totalPages = doc.getPageCount();

      for (let i = 0; i < totalPages; i++) {
        const singlePdf = await PDFDocument.create();
        const [copiedPage] = await singlePdf.copyPages(doc, [i]);
        singlePdf.addPage(copiedPage);

        const pdfBytes = await singlePdf.save(); 
        zip.file(`page_${i + 1}.pdf`, pdfBytes);
      }

      const zipBytes = await zip.generateAsync({ type: "uint8array" });
      
      // Convertimos a un stream web estándar (adiós problemas de tipos)
      const zipStream = bytesToStream(zipBytes);

      return new NextResponse(zipStream, {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="split.zip"',
        },
      });
    }

    // -------------------
    // OTRAS ACCIONES (Retornan un solo PDF)
    // -------------------
    let resultPdf = await PDFDocument.create();

    if (action === "merge") {
      for (const doc of pdfDocs) {
        const pages = await resultPdf.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => resultPdf.addPage(p));
      }
    }

    if (action === "rotate") {
      const [doc] = pdfDocs;
      const pages = await resultPdf.copyPages(doc, doc.getPageIndices());
      pages.forEach((p) => {
        p.setRotation(degrees(rotationAngle));
        resultPdf.addPage(p);
      });
    }

    if (action === "compress") {
      const file = pdfDocs[0];

      const compressionLevel =
        (formData.get("compressionLevel") as string) || "medium";

      const compressionMap: Record<string, string> = {
        low: "/printer",
        medium: "/ebook",
        high: "/screen",
      };

      const level = compressionMap[compressionLevel] || "/ebook";

      const inputPath = path.join(os.tmpdir(), "input.pdf");
      const outputPath = path.join(os.tmpdir(), "output.pdf");

      const bytes = await file.save();
      fs.writeFileSync(inputPath, Buffer.from(bytes));

      await execAsync(
        `${GS} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ` +
        `-dPDFSETTINGS=${level} ` +
        `-dNOPAUSE -dQUIET -dBATCH ` +
        `-sOutputFile="${outputPath}" "${inputPath}"`
      );

      const compressed = fs.readFileSync(outputPath);

      return new NextResponse(compressed, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="compressed.pdf"',
        },
      });
    }

    const pdfBytes = await resultPdf.save(); 
    
    // Convertimos a un stream web estándar
    const pdfStream = bytesToStream(pdfBytes);

    return new NextResponse(pdfStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="result.pdf"',
      },
    });

  } catch (err) {
    console.error("PDF ROUTE ERROR:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}