import { describe, expect, it } from "vitest";

import { createNode, insert, search } from "./bst";

describe("bst placeholders", () => {
  it("insert should place smaller values on the left", () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 5);

    expect(root.left?.value).toBe(5);
  });

  it("insert should place larger values on the right", () => {
    let root = null;
    root = insert(root, 10);
    root = insert(root, 5);
    root = insert(root, 15);

    expect(root.left?.value).toBe(5);
    expect(root.right?.value).toBe(15);
  });

  it("search should return null for non-existent values using strict equality", () => {
    const root = {
      value: 10,
      left: createNode(5),
      right: createNode(15),
    };

    expect(search(root, "5")).toBeNull();
  });
});