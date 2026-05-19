type NodeWithChildren = {
  children?: unknown[];
};

type Root = NodeWithChildren;

type CodeNode = {
  type: "code";
  meta?: string | null;
  data?: {
    hProperties?: Record<string, string>;
  };
};

function isNodeWithChildren(value: unknown): value is NodeWithChildren {
  return typeof value === "object" && value !== null && Array.isArray((value as NodeWithChildren).children);
}

function isCodeNode(value: unknown): value is CodeNode {
  return typeof value === "object" && value !== null && (value as { type?: unknown }).type === "code";
}

function visitCodeNodes(node: unknown, callback: (codeNode: CodeNode) => void) {
  if (isCodeNode(node)) {
    callback(node);
    return;
  }

  if (!isNodeWithChildren(node)) return;

  for (const child of node.children ?? []) {
    visitCodeNodes(child, callback);
  }
}

function parseMeta(meta: string): Record<string, string> {
  const properties: Record<string, string> = { "data-meta": meta };
  const matches = meta.matchAll(/([\w-]+)="([^"]*)"/g);

  for (const match of matches) {
    const [, key, value] = match;
    if (key && value) properties[`data-${key}`] = value;
  }

  return properties;
}

export function remarkCodeMeta() {
  return (tree: Root) => {
    visitCodeNodes(tree, (node) => {
      if (!node.meta) return;
      node.data = node.data ?? {};
      node.data.hProperties = {
        ...node.data.hProperties,
        ...parseMeta(node.meta),
      };
    });
  };
}
