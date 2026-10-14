import fs from "fs";
import path from "path";

export default function IconsPreviewPage() {
  const dir = path.join(process.cwd(), "public", "images", "icon-set");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".svg")).sort();

  return (
    <div className="min-h-screen bg-brand-black p-8">
      <h1 className="mb-6 text-xl font-semibold text-white">Icon set preview ({files.length})</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {files.map((file) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div key={file} className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4">
            <img src={`/images/icon-set/${file}`} alt={file} className="h-12 w-12" />
            <span className="text-center text-[10px] text-white/60">{file}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
