
"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [selectedAction, setSelectedAction] = useState("")
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };
  const [compressionLevel, setCompressionLevel] = useState("medium");
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const sendToAPI = async (action: string) => {

    if (files.length === 0) {
      alert("Seleccioná al menos un PDF");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("action", action);
      formData.append("rotationAngle", rotationAngle.toString());
      formData.append("compressionLevel", compressionLevel);

      const res = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();

        console.error("Backend error:", errData);

        throw new Error(
          errData.error || "Error procesando PDF"
        );
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
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) =>
      prev.filter((file) => file.name !== fileName)
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;

    const updated = [...files];

    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];

    setFiles(updated);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;

    const updated = [...files];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    setFiles(updated);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-10">

      <h1 className="text-4xl font-bold mb-10">📄 PDF Toolkit</h1>

      <div
        {...getRootProps()}
        className="
          mb-6
          w-full
          max-w-xl
          border-2
          border-dashed
          border-gray-600
          rounded-xl
          p-10
          text-center
          cursor-pointer
          transition
          hover:border-blue-500
        "
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Soltá los PDFs aquí...</p>
        ) : (
          <p>
            Arrastrá PDFs aquí o hacé click para seleccionarlos
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mb-6 text-sm text-gray-300">
          <p className="mb-2">Archivos seleccionados:</p>

          <ul>
            {files.map((file, index) => (
              <li
                key={file.name}
                className="flex items-center justify-between mb-1"
              >
                <span>
                  {file.name} (
                  {(file.size / 1024 / 1024).toFixed(2)}
                  {" "}MB)
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(index)}
                    className="text-blue-400"
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => moveDown(index)}
                    className="text-blue-400"
                  >
                    ↓
                  </button>
                </div>

                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-400 hover:text-red-300 ml-4"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setFiles([])}
            className="mt-3 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
          >
            Limpiar archivos
          </button>

        </div>
      )}

      {selectedAction === "rotate" && (
        <div className="mb-6">
          <label className="mr-3">
            Ángulo de rotación:
          </label>

          <select
            value={rotationAngle}
            onChange={(e) =>
              setRotationAngle(Number(e.target.value))
            }
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value={90}>90°</option>
            <option value={180}>180°</option>
            <option value={270}>270°</option>
          </select>
        </div>
      )}

      {selectedAction === "compress" && (
        <div className="mb-6">
          <label className="mr-3">Nivel de compresión:</label>

          <select
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="low">Baja (mejor calidad)</option>
            <option value="medium">Media (recomendado)</option>
            <option value="high">Alta (máxima compresión)</option>
          </select>
        </div>
      )}

      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-xl shadow-lg">

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => setSelectedAction("merge")}
            className={`
              p-3 rounded-xl
              ${selectedAction === "merge"
                ? "bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            Unir PDFs
          </button>

          <button
            onClick={() => setSelectedAction("split")}
            className={`
              p-3 rounded-xl
              ${selectedAction === "split"
                ? "bg-purple-700"
                : "bg-purple-600 hover:bg-purple-700"}
            `}
          >
            Dividir PDF
          </button>

          <button
            onClick={() => setSelectedAction("rotate")}
            className={`
              p-3 rounded-xl
              ${selectedAction === "rotate"
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-700"}
            `}
          >
            Rotar PDF
          </button>

          <button
            onClick={() => setSelectedAction("compress")}
            className={`
              p-3 rounded-xl
              ${selectedAction === "compress"
                ? "bg-red-700"
                : "bg-red-600 hover:bg-red-700"}
            `}
          >
            Comprimir
          </button>

        </div>

        {selectedAction && (
          <div className="mt-6 text-center">
            <button
              disabled={loading}
              // Pasamos directamente el estado actual como argumento seguro
              onClick={() => sendToAPI(selectedAction)} 
              className="
                bg-yellow-500
                hover:bg-yellow-600
                text-black
                font-bold
                px-8
                py-3
                rounded-xl
                disabled:opacity-50
              "
            >
              {loading ? "Procesando..." : `Procesar ${selectedAction}`}
            </button>
          </div>
        )}

      </div>

    </main>
  );
}
