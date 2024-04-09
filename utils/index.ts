import fs from "node:fs/promises";

/**
 * Normalizes and slices a string.
 * Returns a slugified string that is suitable for a URL.
 *
 * @param {string} title
 * @return {string}
 */
export const slugify = (title: string) => {
  const normalizedTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with dashes

  return normalizedTitle.slice(0, 50);
};

/**
 * Get cached production asset from ./dist directory or fresh dev page from /src/pages/
 *
 * This function will eventually need to pull its url param from some sort of API call.
 * url will eventually be a page type like "homepage", "admin", "section", "story"
 *
 * The purpose of pulling various HTML pages is to structure <meta> data differently
 *
 * @param {{
 *   isProduction: boolean;
 *   url: string;
 * }}
 * @return {*}
 */
export const getHTMLPageType = async ({
  isProduction,
  url,
}: {
  isProduction: boolean;
  url: string;
}) => {
  // Maps desired URL to built HTML files
  const templatePagePaths: any = {
    admin: "src/page_types/admin/",
    homepage: "src/page_types/homepage/",
  };

  return await fs.readFile(
    `${isProduction ? "./dist/client/" : ""}${
      templatePagePaths[url] || ""
    }index.html`,
    "utf-8"
  );
};

export default {};
