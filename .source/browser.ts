// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"folder-structure.md": () => import("../content/docs/folder-structure.md?collection=docs"), "getting-started.md": () => import("../content/docs/getting-started.md?collection=docs"), "index.md": () => import("../content/docs/index.md?collection=docs"), "key-concepts.md": () => import("../content/docs/key-concepts.md?collection=docs"), }),
};
export default browserCollections;