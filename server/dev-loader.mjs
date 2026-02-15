import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import ts from "typescript";

const LOADER_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(LOADER_DIR, "..");
const SHARED_ROOT = path.join(PROJECT_ROOT, "shared");
const CLIENT_SRC_ROOT = path.join(PROJECT_ROOT, "client", "src");
const TS_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs", ".json"];
const TRANSPILE_OPTIONS = {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.Preserve,
    esModuleInterop: true,
    allowImportingTsExtensions: true,
    sourceMap: false,
  },
};

function hasFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolvePathCandidate(candidatePath) {
  if (hasFile(candidatePath)) {
    return candidatePath;
  }

  for (const extension of TS_EXTENSIONS) {
    const withExtension = `${candidatePath}${extension}`;
    if (hasFile(withExtension)) {
      return withExtension;
    }
  }

  for (const extension of TS_EXTENSIONS) {
    const indexPath = path.join(candidatePath, `index${extension}`);
    if (hasFile(indexPath)) {
      return indexPath;
    }
  }

  return null;
}

function resolveAliasPath(specifier) {
  if (specifier.startsWith("@shared/")) {
    return path.join(SHARED_ROOT, specifier.slice("@shared/".length));
  }
  if (specifier.startsWith("@/")) {
    return path.join(CLIENT_SRC_ROOT, specifier.slice(2));
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  const aliasPath = resolveAliasPath(specifier);
  if (aliasPath) {
    const resolvedAlias = resolvePathCandidate(aliasPath);
    if (!resolvedAlias) {
      throw new Error(`Unable to resolve alias import: ${specifier}`);
    }
    return {
      shortCircuit: true,
      url: pathToFileURL(resolvedAlias).href,
    };
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parentPath = context.parentURL?.startsWith("file:")
      ? fileURLToPath(context.parentURL)
      : path.join(PROJECT_ROOT, "index.js");
    const resolvedRelative = resolvePathCandidate(
      path.resolve(path.dirname(parentPath), specifier),
    );
    if (resolvedRelative) {
      return {
        shortCircuit: true,
        url: pathToFileURL(resolvedRelative).href,
      };
    }
  }

  if (specifier.startsWith("file:")) {
    const resolvedAbsolute = resolvePathCandidate(fileURLToPath(specifier));
    if (resolvedAbsolute) {
      return {
        shortCircuit: true,
        url: pathToFileURL(resolvedAbsolute).href,
      };
    }
  }

  if (path.isAbsolute(specifier)) {
    const resolvedAbsolute = resolvePathCandidate(specifier);
    if (resolvedAbsolute) {
      return {
        shortCircuit: true,
        url: pathToFileURL(resolvedAbsolute).href,
      };
    }
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (!url.startsWith("file:")) {
    return nextLoad(url, context);
  }

  const filePath = fileURLToPath(url);
  const extension = path.extname(filePath).toLowerCase();

  if (![".ts", ".tsx", ".mts", ".cts"].includes(extension)) {
    return nextLoad(url, context);
  }

  const sourceText = await fs.promises.readFile(filePath, "utf8");
  const transpiled = ts.transpileModule(sourceText, {
    ...TRANSPILE_OPTIONS,
    fileName: filePath,
  });

  return {
    shortCircuit: true,
    format: "module",
    source: transpiled.outputText,
  };
}
