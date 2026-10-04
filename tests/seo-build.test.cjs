const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const test = require("node:test");

const root = join(__dirname, "..");

function build(t, extraConfig = "", args = []) {
  const directory = mkdtempSync(join(tmpdir(), "dojo-seo-build-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const config = join(directory, "seo.toml");
  const destination = join(directory, "public");
  writeFileSync(config, extraConfig);
  const result = spawnSync("hugo", [
    "--config", `hugo.toml,${config}`,
    "--destination", destination,
    "--minify",
    ...args,
  ], { cwd: root, encoding: "utf8" });
  if (result.error) throw result.error;
  return {
    ...result,
    output: result.stdout + result.stderr,
    page: (path = "index.html") => readFileSync(join(destination, path), "utf8"),
  };
}

const approvedPages = [
  {
    path: "en/index.html",
    title: "Goju-Ryu Karate | Dojo Budôkaizen",
    description: "Discover Dojo Budôkaizen: train in Goju-Ryu Karate with Sensei Luís Filipe at Acro Clube Maia. Check the schedule and get in touch.",
  },
  {
    path: "en/instructors/index.html",
    title: "Sensei Luís Filipe | Dojo Budôkaizen",
    description: "Meet Sensei Luís Filipe and the Dojo Budôkaizen instructor team. Learn more about those who lead Goju-Ryu Karate training.",
  },
  {
    path: "en/contact/index.html",
    title: "Contact and Location | Dojo Budôkaizen",
    description: "Find Dojo Budôkaizen at Acro Clube Maia. See the location and contact details to learn more about Goju-Ryu Karate training.",
  },
  {
    path: "en/schedule/index.html",
    title: "Karate Training Schedule | Dojo Budôkaizen",
    description: "See the Dojo Budôkaizen Goju-Ryu Karate training schedule at Acro Clube Maia and get in touch for more information.",
  },
  {
    path: "index.html",
    title: "Karate Goju-Ryu | Dojo Budôkaizen",
    description: "Conheça o Dojo Budôkaizen: treino de Karate Goju-Ryu com o Sensei Luís Filipe no Acro Clube Maia. Consulte os horários e entre em contacto.",
  },
  {
    path: "instructors/index.html",
    title: "Sensei Luís Filipe | Dojo Budôkaizen",
    description: "Conheça o Sensei Luís Filipe e a equipa de instrutores do Dojo Budôkaizen. Saiba mais sobre quem orienta os treinos de Karate Goju-Ryu.",
  },
  {
    path: "contact/index.html",
    title: "Contactos e Localização | Dojo Budôkaizen",
    description: "Encontre o Dojo Budôkaizen no Acro Clube Maia. Consulte a localização e os contactos para saber mais sobre os treinos de Karate Goju-Ryu.",
  },
  {
    path: "schedule/index.html",
    title: "Horários de Karate | Dojo Budôkaizen",
    description: "Consulte os horários de treino de Karate Goju-Ryu do Dojo Budôkaizen no Acro Clube Maia e entre em contacto para obter mais informações.",
  },
];

test("approved English and Portuguese SEO metadata leaves visible navigation and headings unchanged", (t) => {
  const result = build(t);
  assert.equal(result.status, 0, result.output);
  for (const { path, title, description } of approvedPages) {
    const html = result.page(path);
    const actualTitle = html.match(/<title>(.*?)<\/title>/)?.[1];
    const actualDescription = html.match(/<meta name=description content="(.*?)"/)?.[1];
    assert.equal(actualTitle, title, `Unexpected title on ${path}`);
    assert.equal(actualDescription, description, `Unexpected description on ${path}`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `Duplicate title on ${path}`);
    assert.equal(title.split("Dojo Budôkaizen").length - 1, 1, `Site name should appear once in ${path}`);
    assert.doesNotMatch(title, /Maia/i, `Venue should not appear in the title on ${path}`);
    if (!path.includes("instructors")) {
      assert.match(description, /Acro Clube Maia/, `Venue should remain in the description on ${path}`);
    }
  }

  const enHome = result.page("en/index.html");
  const ptHome = result.page();
  assert.match(enHome, /Dojo Budôkaizen is dedicated to the practice of Goju-Ryu Karate, led by Sensei Luís Filipe, with training at Acro Clube Maia\./);
  assert.match(ptHome, /O Dojo Budôkaizen dedica-se à prática de Karate Goju-Ryu, com orientação do Sensei Luís Filipe e treinos no Acro Clube Maia\./);
  assert.match(enHome, />Instructors<\/a>/);
  assert.match(enHome, />Schedule<\/a>/);
  assert.match(enHome, />Contact<\/a>/);
  assert.match(ptHome, />Instrutores<\/a>/);
  assert.match(ptHome, />Horários<\/a>/);
  assert.match(ptHome, />Contacto<\/a>/);
  assert.match(result.page("en/contact/index.html"), /<h1[^>]*>Contact<\/h1>/);
  assert.match(result.page("contact/index.html"), /<h1[^>]*>Contacto<\/h1>/);
  assert.match(result.page("en/schedule/index.html"), /<h1[^>]*>Schedule<\/h1>/);
  assert.match(result.page("schedule/index.html"), /<h1[^>]*>Horários<\/h1>/);
  assert.match(result.page("en/instructors/index.html"), /<h2[^>]*>Meet Our Instructors<\/h2>/);
  assert.match(result.page("instructors/index.html"), /<h2[^>]*>Conheça os Nossos Instrutores<\/h2>/);
});

function buildWithMetadata(t, languages) {
  const directory = mkdtempSync(join(tmpdir(), "dojo-seo-languages-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const contentRoot = join(directory, "content");
  const dataRoot = join(directory, "data");
  cpSync(join(root, "data"), dataRoot, { recursive: true });
  cpSync(join(root, "data/en"), join(dataRoot, "es"), { recursive: true });

  let settings = `defaultContentLanguage = "en"\ndefaultContentLanguageInSubdir = false\ndataDir = "${dataRoot}"\n`;
  for (const [language, values] of Object.entries(languages)) {
    const contentDir = join(contentRoot, language);
    cpSync(join(root, "content/en"), contentDir, { recursive: true });
    settings += `
[languages.${language}]
title = "${values.siteTitle}"
contentDir = "${contentDir}"
weight = ${language === "en" ? 1 : language === "pt" ? 2 : 3}
`;
    for (const path of ["_index.md", "instructors.md", "contact.md", "schedule.md"]) {
      const file = join(contentDir, path);
      const original = readFileSync(file, "utf8");
      const frontMatter = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      assert.ok(frontMatter, `Missing front matter in ${path}`);
      const fields = frontMatter[1]
        .replace(/^title:.*(?:\r?\n|$)/m, "")
        .replace(/^description:.*(?:\r?\n|$)/m, "")
        .replace(/^seo:\r?\n(?:[ \t].*(?:\r?\n|$))*/m, "")
        .trim();
      const metadata = [
        `title: "${values.pageTitle}"`,
        `description: '${values.description}'`,
        ...(values.seoTitle === undefined ? [] : [`seo:\n  title: '${values.seoTitle}'`]),
      ].join("\n");
      writeFileSync(file, original.replace(frontMatter[0], `---\n${fields}\n${metadata}\n---`));
    }
  }

  const config = join(directory, "seo.toml");
  writeFileSync(config, settings);
  const destination = join(directory, "public");
  const result = spawnSync("hugo", [
    "--config", `hugo.toml,${config}`,
    "--destination", destination,
    "--baseURL", "https://example.com/",
    "--minify",
  ], { cwd: root, encoding: "utf8" });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, result.stdout + result.stderr);
  return (path) => readFileSync(join(destination, path), "utf8");
}

test("omitted or empty SEO titles preserve language-specific title fallback", (t) => {
  const page = buildWithMetadata(t, {
    en: { siteTitle: "English dojo", pageTitle: "Instructors", description: "English description" },
    pt: { siteTitle: "Dojo português", pageTitle: "Instrutores", description: "Descrição portuguesa", seoTitle: "" },
  });
  assert.match(page("instructors/index.html"), /<title>Instructors \| English dojo<\/title>/);
  assert.match(page("pt/instructors/index.html"), /<title>Instrutores \| Dojo português<\/title>/);
});

test("SEO metadata is independently translated for a third language", (t) => {
  const languages = {
    en: { siteTitle: "English dojo", pageTitle: "Instructors", description: "Meet our instructors", seoTitle: "Goju-Ryu & Training | English dojo" },
    pt: { siteTitle: "Dojo português", pageTitle: "Instrutores", description: "Conheça os instrutores", seoTitle: "Karate Goju-Ryu | Dojo português" },
    es: { siteTitle: "Dojo español", pageTitle: "Instructores", description: "Conoce a los instructores", seoTitle: "Karate Goju-Ryu | Dojo español" },
  };
  const page = buildWithMetadata(t, languages);
  for (const [language, values] of Object.entries(languages)) {
    const prefix = language === "en" ? "" : `${language}/`;
    for (const path of ["index.html", "instructors/index.html", "contact/index.html", "schedule/index.html"]) {
      const html = page(prefix + path);
      const title = html.match(/<title>(.*?)<\/title>/)?.[1].replace(/&amp;/g, "&");
      assert.equal(title, values.seoTitle);
      assert.ok(html.includes(values.description));
      assert.equal((html.match(/<title>/g) || []).length, 1);
      assert.equal((html.match(/name=description\b/g) || []).length, 1);
      assert.match(html, /rel=canonical/);
      assert.match(html, /property=["']?og:title/);
    }
    assert.match(page(`${prefix}schedule/index.html`), new RegExp(`>${values.pageTitle}</h1>`));
  }
});

test("SEO titles are escaped rather than treated as HTML", (t) => {
  const page = buildWithMetadata(t, {
    en: { siteTitle: "Test dojo", pageTitle: "Contact", description: "Contact us", seoTitle: '<script>alert("test")</script> | Test dojo' },
  });
  const html = page("contact/index.html");
  assert.match(html, /<title>&lt;script/);
  assert.doesNotMatch(html, /<title><script>/);
});
