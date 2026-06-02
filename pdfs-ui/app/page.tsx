
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-10">
      
      <h1 className="text-4xl font-bold mb-10">
        📄 PDF Toolkit
      </h1>

      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-xl shadow-lg">
        
        <div className="border-2 border-dashed border-gray-600 p-10 rounded-xl text-center mb-6">
          <p className="text-gray-400">
            Arrastrá archivos PDF aquí
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl">
            Unir PDFs
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-xl">
            Dividir PDF
          </button>

          <button className="bg-green-600 hover:bg-green-700 p-3 rounded-xl">
            Rotar PDF
          </button>

          <button className="bg-red-600 hover:bg-red-700 p-3 rounded-xl">
            Comprimir
          </button>
        </div>

      </div>

    </main>
  );
}
