#!/usr/bin/env node
/*
 * Generates the site's photography with OpenAI's GPT Image model and writes
 * the results over the placeholder art in assets/img/.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-...  node scripts/generate-images.mjs            # all images
 *   OPENAI_API_KEY=sk-...  node scripts/generate-images.mjs montana    # one image
 *
 * Options (env vars):
 *   IMAGE_MODEL   model id (default: "gpt-image-2"; use "gpt-image-1" if
 *                 your account doesn't have access to 2)
 *   IMAGE_QUALITY low | medium | high (default: high)
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Set OPENAI_API_KEY before running this script.");
  process.exit(1);
}

const MODEL = process.env.IMAGE_MODEL || "gpt-image-2";
const QUALITY = process.env.IMAGE_QUALITY || "high";
const SIZE = "1536x1024";
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "img");

/* Shared art direction so every photo feels like one shoot. */
const STYLE = [
  "Professional editorial photograph, soft natural window light,",
  "calm and trustworthy mood, muted color palette with deep navy and",
  "soft teal undertones, shallow depth of field, realistic, understated,",
  "suitable for a medical consulting firm's website.",
  "No visible text, no logos, no readable documents,",
  "no identifiable patient information.",
].join(" ");

const IMAGES = {
  montana: `Wide landscape photograph of mountain ridgelines near Bozeman,
    Montana at dawn. Layers of blue mountains receding into soft morning
    mist under a big open sky, first golden light touching the peaks,
    evergreen foothills in the foreground. Serene, grounded, expansive.
    ${STYLE}`,

  "svc-utilization": `A nurse consultant in professional attire reviewing
    paperwork on a clipboard together with a member of a skilled nursing
    facility's staff at a bright nurses' station. Collaborative,
    focused, reassuring. Papers angled away from camera and softly out
    of focus. ${STYLE}`,

  "svc-peer-review": `A senior physician in his sixties with reading
    glasses, seated at a wooden desk, thoughtfully reviewing a medical
    chart. Stethoscope resting on the desk, warm office light, calm
    concentration and decades of experience in his expression.
    Chart contents softly out of focus. ${STYLE}`,

  "svc-rac": `A healthcare consultant at a tidy conference table with
    neatly organized folders of documents, making careful notes on a
    legal pad while preparing an appeal strategy. Composed, methodical,
    confident. Document text softly out of focus. ${STYLE}`,

  "svc-education": `A consultant standing beside a small whiteboard,
    warmly explaining a concept to three attentive nurses seated around
    a table in a facility break room. Engaged, encouraging, practical.
    Whiteboard content abstract and out of focus. ${STYLE}`,

  working: `A friendly working meeting between a healthcare consultant
    and a small nursing team around a table in a sunlit facility
    meeting room, reviewing a weekly patient list together. Warm,
    cooperative, unhurried. Any documents softly out of focus. ${STYLE}`,
};

async function generate(name, prompt) {
  process.stdout.write(`Generating ${name}.png … `);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: prompt.replace(/\s+/g, " ").trim(),
      size: SIZE,
      quality: QUALITY,
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}\n${body}`);
  }

  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image data returned:\n${JSON.stringify(data).slice(0, 400)}`);

  const file = join(OUT_DIR, `${name}.png`);
  await writeFile(file, Buffer.from(b64, "base64"));
  console.log(`done → ${file}`);
}

const requested = process.argv.slice(2);
const names = requested.length ? requested : Object.keys(IMAGES);

for (const name of names) {
  const key = name.replace(/\.png$/, "");
  if (!IMAGES[key]) {
    console.error(`Unknown image "${name}". Available: ${Object.keys(IMAGES).join(", ")}`);
    process.exit(1);
  }
  try {
    await generate(key, IMAGES[key]);
  } catch (err) {
    console.error(`\nFailed on ${key}: ${err.message}`);
    if (String(err.message).includes("model")) {
      console.error('Tip: try IMAGE_MODEL=gpt-image-1 if your account lacks access to gpt-image-2.');
    }
    process.exit(1);
  }
}
console.log("All images generated.");
