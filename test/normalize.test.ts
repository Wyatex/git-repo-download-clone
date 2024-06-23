import { describe, it, expect } from "vitest";
import { normalize } from "../src/normalize";

describe("normalize test", () => {
  describe("http", () => {
    it("valid http", () => {
      expect(normalize("http://a.com/b/c.git")).toStrictEqual({
        url: "http://a.com/b/c.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("http://a.com/b/c.git#main")).toStrictEqual({
        url: "http://a.com/b/c.git",
        branch: "main",
        type: "http",
      });
      expect(normalize("https://a.com/b/c.git")).toStrictEqual({
        url: "https://a.com/b/c.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("https://a.com/b/c.git#main")).toStrictEqual({
        url: "https://a.com/b/c.git",
        branch: "main",
        type: "http",
      });
      expect(normalize("https://a.com/b/c.git#main")).toStrictEqual({
        url: "https://a.com/b/c.git",
        branch: "main",
        type: "http",
      });
      expect(() => normalize("a.com:123/abc/b/c")).toThrowError("Invalid repo");
    });
    it("valid short", () => {
      expect(normalize("github:a/b")).toStrictEqual({
        url: "https://github.com/a/b.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("a/b")).toStrictEqual({
        url: "https://github.com/a/b.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("gitlab:a/b")).toStrictEqual({
        url: "https://gitlab.com/a/b.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("bitbucket:a/b")).toStrictEqual({
        url: "https://bitbucket.org/a/b.git",
        branch: "master",
        type: "http",
      });
      expect(normalize("gitee:a/b")).toStrictEqual({
        url: "https://gitee.com/a/b.git",
        branch: "master",
        type: "http",
      });
      expect(() => normalize("unknown:a/b")).toThrowError("Invalid repo");
    });
  });
  it("ssh", () => {
    expect(normalize("git@a.com:123/abc/b/c.git")).toStrictEqual({
      url: "git@a.com:123/abc/b/c.git",
      branch: "master",
      type: "ssh",
    });
  });
});
