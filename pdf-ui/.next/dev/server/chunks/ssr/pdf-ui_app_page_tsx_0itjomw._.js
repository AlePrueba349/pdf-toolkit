module.exports = [
"[project]/pdf-ui/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pdf-ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pdf-ui/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/pdf-ui/node_modules/react-dropzone/dist/es/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
function Home() {
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rotationAngle, setRotationAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(90);
    const [selectedAction, setSelectedAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const onDrop = (acceptedFiles)=>{
        setFiles(acceptedFiles);
    };
    const [compressionLevel, setCompressionLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("medium");
    const { getRootProps, getInputProps, isDragActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$react$2d$dropzone$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useDropzone"])({
        onDrop,
        accept: {
            "application/pdf": [
                ".pdf"
            ]
        },
        multiple: true
    });
    const sendToAPI = async (action)=>{
        if (files.length === 0) {
            alert("Seleccioná al menos un PDF");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            files.forEach((file)=>{
                formData.append("files", file);
            });
            formData.append("action", action);
            formData.append("rotationAngle", rotationAngle.toString());
            formData.append("compressionLevel", compressionLevel);
            const res = await fetch("/api/pdf", {
                method: "POST",
                body: formData
            });
            if (!res.ok) {
                const errData = await res.json();
                console.error("Backend error:", errData);
                throw new Error(errData.error || "Error procesando PDF");
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            // Detectar extensión según el tipo de respuesta 
            const contentType = res.headers.get("content-type") || "";
            let filename = `${action}-resultado.pdf`;
            if (contentType.includes("application/zip") || action === "split") {
                filename = `${action}-resultado.zip`;
            }
            // -----------------------------------------------------------------
            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Usa el nombre dinámico correcto (.zip o .pdf)
            document.body.appendChild(a); // Buena práctica agregarlo al DOM temporalmente
            a.click();
            // Limpieza limpia del DOM y memoria
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Ocurrió un error");
            }
        } finally{
            setLoading(false);
        }
    };
    const removeFile = (fileName)=>{
        setFiles((prev)=>prev.filter((file)=>file.name !== fileName));
    };
    const moveUp = (index)=>{
        if (index === 0) return;
        const updated = [
            ...files
        ];
        [updated[index - 1], updated[index]] = [
            updated[index],
            updated[index - 1]
        ];
        setFiles(updated);
    };
    const moveDown = (index)=>{
        if (index === files.length - 1) return;
        const updated = [
            ...files
        ];
        [updated[index], updated[index + 1]] = [
            updated[index + 1],
            updated[index]
        ];
        setFiles(updated);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-10",
                children: "📄 PDF Toolkit"
            }, void 0, false, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ...getRootProps(),
                className: " mb-6 w-full max-w-xl border-2 border-dashed border-gray-600 rounded-xl p-10 text-center cursor-pointer transition hover:border-blue-500 ",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ...getInputProps()
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    isDragActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Soltá los PDFs aquí..."
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Arrastrá PDFs aquí o hacé click para seleccionarlos"
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 text-sm text-gray-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2",
                        children: "Archivos seleccionados:"
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: files.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            file.name,
                                            " (",
                                            (file.size / 1024 / 1024).toFixed(2),
                                            " ",
                                            "MB)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pdf-ui/app/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>moveUp(index),
                                                className: "text-blue-400",
                                                children: "↑"
                                            }, void 0, false, {
                                                fileName: "[project]/pdf-ui/app/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>moveDown(index),
                                                className: "text-blue-400",
                                                children: "↓"
                                            }, void 0, false, {
                                                fileName: "[project]/pdf-ui/app/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pdf-ui/app/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>removeFile(file.name),
                                        className: "text-red-400 hover:text-red-300 ml-4",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/pdf-ui/app/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, file.name, true, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFiles([]),
                        className: "mt-3 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded",
                        children: "Limpiar archivos"
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            selectedAction === "rotate" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mr-3",
                        children: "Ángulo de rotación:"
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: rotationAngle,
                        onChange: (e)=>setRotationAngle(Number(e.target.value)),
                        className: "bg-gray-800 text-white p-2 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 90,
                                children: "90°"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 180,
                                children: "180°"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 270,
                                children: "270°"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, this),
            selectedAction === "compress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mr-3",
                        children: "Nivel de compresión:"
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: compressionLevel,
                        onChange: (e)=>setCompressionLevel(e.target.value),
                        className: "bg-gray-800 text-white p-2 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "low",
                                children: "Baja (mejor calidad)"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "medium",
                                children: "Media (recomendado)"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "high",
                                children: "Alta (máxima compresión)"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900 p-8 rounded-2xl w-full max-w-xl shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedAction("merge"),
                                className: `
              p-3 rounded-xl
              ${selectedAction === "merge" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}
            `,
                                children: "Unir PDFs"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedAction("split"),
                                className: `
              p-3 rounded-xl
              ${selectedAction === "split" ? "bg-purple-700" : "bg-purple-600 hover:bg-purple-700"}
            `,
                                children: "Dividir PDF"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedAction("rotate"),
                                className: `
              p-3 rounded-xl
              ${selectedAction === "rotate" ? "bg-green-700" : "bg-green-600 hover:bg-green-700"}
            `,
                                children: "Rotar PDF"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedAction("compress"),
                                className: `
              p-3 rounded-xl
              ${selectedAction === "compress" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"}
            `,
                                children: "Comprimir"
                            }, void 0, false, {
                                fileName: "[project]/pdf-ui/app/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    selectedAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$pdf$2d$ui$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: loading,
                            // Pasamos directamente el estado actual como argumento seguro
                            onClick: ()=>sendToAPI(selectedAction),
                            className: " bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-xl disabled:opacity-50 ",
                            children: loading ? "Procesando..." : `Procesar ${selectedAction}`
                        }, void 0, false, {
                            fileName: "[project]/pdf-ui/app/page.tsx",
                            lineNumber: 303,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pdf-ui/app/page.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pdf-ui/app/page.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pdf-ui/app/page.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=pdf-ui_app_page_tsx_0itjomw._.js.map