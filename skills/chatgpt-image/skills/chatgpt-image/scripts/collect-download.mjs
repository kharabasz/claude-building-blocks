import { closeSync, copyFileSync, existsSync, mkdirSync, openSync, readSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const [sinceArg, out, timeoutArg] = process.argv.slice(2);
if (!sinceArg || !out) {
  console.error("usage: node collect-download.mjs <since-epoch-ms> <out-path> [timeout-seconds]");
  process.exit(2);
}
const since = Number(sinceArg);
const downloads = process.env.CHATGPT_IMAGE_DOWNLOADS ?? join(process.env.USERPROFILE ?? process.env.HOME, "Downloads");
const timeout = Number(timeoutArg ?? 90);
const deadline = Date.now() + timeout * 1000;

const isImage = (path) => {
  const fd = openSync(path, "r");
  const head = Buffer.alloc(12);
  readSync(fd, head, 0, 12, 0);
  closeSync(fd);
  const png = head.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const webp = head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP";
  const jpeg = head[0] === 0xff && head[1] === 0xd8;
  return png || webp || jpeg;
};

const newest = () => readdirSync(downloads)
  .map((f) => ({ f, s: statSync(join(downloads, f)) }))
  .filter(({ s }) => s.isFile() && s.birthtimeMs >= since && s.size > 0)
  .sort((a, b) => b.s.birthtimeMs - a.s.birthtimeMs)[0];

let last = { f: "", size: -1 };
for (;;) {
  const hit = newest();
  if (hit) {
    const src = join(downloads, hit.f);
    if (hit.f === last.f && hit.s.size === last.size && isImage(src)) {
      const target = resolve(out);
      mkdirSync(dirname(target), { recursive: true });
      if (existsSync(target)) unlinkSync(target);
      copyFileSync(src, target);
      try { unlinkSync(src); } catch {}
      console.log(`${target} ${hit.s.size} (from ${hit.f})`);
      process.exit(0);
    }
    last = { f: hit.f, size: hit.s.size };
  }
  if (Date.now() > deadline) {
    console.error(`no finished image in ${downloads} created after ${new Date(since).toISOString()} within ${timeout}s`);
    process.exit(1);
  }
  await new Promise((r) => setTimeout(r, 1000));
}
