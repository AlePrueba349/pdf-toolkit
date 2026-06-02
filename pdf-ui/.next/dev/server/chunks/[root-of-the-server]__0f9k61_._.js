module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/pdf-ui/app/api/pdf/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pdf-ui/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$PDFDocument$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PDFDocument$3e$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/api/PDFDocument.js [app-route] (ecmascript) <export default as PDFDocument>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/api/rotations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pdf-ui/node_modules/jszip/lib/index.js [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs";
// Función utilitaria para transformar cualquier Uint8Array/Buffer en un Stream compatible con BodyInit
function bytesToStream(bytes) {
    return new ReadableStream({
        start (controller) {
            controller.enqueue(bytes);
            controller.close();
        }
    });
}
async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files");
        const action = formData.get("action");
        const rotationAngle = Number(formData.get("rotationAngle") || 90);
        const compressionLevel = formData.get("compressionLevel") || "medium";
        const compressionMap = {
            low: "/printer",
            medium: "/ebook",
            high: "/screen"
        };
        const level = compressionMap[compressionLevel] || "/ebook";
        await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ` + `-dPDFSETTINGS=${level} ` + `-dNOPAUSE -dQUIET -dBATCH ` + `-sOutputFile="${outputPath}" "${inputPath}"`);
        console.log("ACTION:", action);
        console.log("FILES:", files.length);
        if (!files || files.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No files"
            }, {
                status: 400
            });
        }
        const pdfDocs = await Promise.all(files.map(async (file)=>{
            const bytes = await file.arrayBuffer();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$PDFDocument$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PDFDocument$3e$__["PDFDocument"].load(bytes);
        }));
        // -------------------
        // ACCIÓN: SPLIT (Retorna ZIP)
        // -------------------
        if (action === "split") {
            const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$jszip$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
            const doc = pdfDocs[0];
            const totalPages = doc.getPageCount();
            for(let i = 0; i < totalPages; i++){
                const singlePdf = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$PDFDocument$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PDFDocument$3e$__["PDFDocument"].create();
                const [copiedPage] = await singlePdf.copyPages(doc, [
                    i
                ]);
                singlePdf.addPage(copiedPage);
                const pdfBytes = await singlePdf.save();
                zip.file(`page_${i + 1}.pdf`, pdfBytes);
            }
            const zipBytes = await zip.generateAsync({
                type: "uint8array"
            });
            // Convertimos a un stream web estándar (adiós problemas de tipos)
            const zipStream = bytesToStream(zipBytes);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](zipStream, {
                status: 200,
                headers: {
                    "Content-Type": "application/zip",
                    "Content-Disposition": 'attachment; filename="split.zip"'
                }
            });
        }
        // -------------------
        // OTRAS ACCIONES (Retornan un solo PDF)
        // -------------------
        let resultPdf = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$PDFDocument$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PDFDocument$3e$__["PDFDocument"].create();
        if (action === "merge") {
            for (const doc of pdfDocs){
                const pages = await resultPdf.copyPages(doc, doc.getPageIndices());
                pages.forEach((p)=>resultPdf.addPage(p));
            }
        }
        if (action === "rotate") {
            const [doc] = pdfDocs;
            const pages = await resultPdf.copyPages(doc, doc.getPageIndices());
            pages.forEach((p)=>{
                p.setRotation((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$rotations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["degrees"])(rotationAngle));
                resultPdf.addPage(p);
            });
        }
        if (action === "compress") {
            const file = pdfDocs[0];
            const compressionLevel = formData.get("compressionLevel") || "medium";
            const compressionMap = {
                low: "/printer",
                medium: "/ebook",
                high: "/screen"
            };
            const level = compressionMap[compressionLevel] || "/ebook";
            const inputPath1 = path.join(os.tmpdir(), "input.pdf");
            const outputPath1 = path.join(os.tmpdir(), "output.pdf");
            const bytes = await file.save();
            fs.writeFileSync(inputPath1, Buffer.from(bytes));
            await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ` + `-dPDFSETTINGS=${level} ` + `-dNOPAUSE -dQUIET -dBATCH ` + `-sOutputFile="${outputPath1}" "${inputPath1}"`);
            const compressed = fs.readFileSync(outputPath1);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](compressed, {
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": 'attachment; filename="compressed.pdf"'
                }
            });
        }
        const pdfBytes = await resultPdf.save();
        // Convertimos a un stream web estándar
        const pdfStream = bytesToStream(pdfBytes);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](pdfStream, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="result.pdf"'
            }
        });
    } catch (err) {
        console.error("PDF ROUTE ERROR:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: String(err)
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f9k61_._.js.map