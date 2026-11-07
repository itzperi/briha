/** Build-time guards for titles and descriptions. Throws so a bad page can never ship. */
export const TITLE_MAX = 60;
export const DESC_MAX = 160;

export function assertMeta(path: string, title: string, description: string) {
  if (!title || !description) throw new Error(`[seo] ${path}: title and description are required`);
  if (title.length > TITLE_MAX) throw new Error(`[seo] ${path}: title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
  if (description.length > DESC_MAX)
    throw new Error(`[seo] ${path}: description is ${description.length} chars (max ${DESC_MAX})`);
}
