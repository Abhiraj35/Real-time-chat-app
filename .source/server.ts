// @ts-nocheck
import * as __fd_glob_3 from "../content/docs/key-concepts.md?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.md?collection=docs"
import * as __fd_glob_1 from "../content/docs/getting-started.md?collection=docs"
import * as __fd_glob_0 from "../content/docs/folder-structure.md?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"folder-structure.md": __fd_glob_0, "getting-started.md": __fd_glob_1, "index.md": __fd_glob_2, "key-concepts.md": __fd_glob_3, });