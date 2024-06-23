const sortGitServerOriginMap = {
  github: "github.com",
  gitlab: "gitlab.com",
  bitbucket: "bitbucket.org",
  gitee: "gitee.com",
};

export function normalize(repo: string) {
  if (repo.startsWith("https://") || repo.startsWith("http://")) {
    const match = /^(?:(https:\/\/|http:\/\/)([^#]+)(?:#(.+))?)$/.exec(repo);
    if (!match) {
      throw new Error("Invalid repo");
    }
    const [url, branch] = repo.split("#");
    return {
      url,
      branch: branch || "master",
      type: "http",
    };
  }
  if (repo.startsWith("git@")) {
    const match = /^(git@[^:]+:([^#]+)(?:#(.+))?)$/.exec(repo);
    if (!match) {
      throw new Error("Invalid repo");
    }
    const [url, branch] = repo.split("#");
    return {
      url,
      branch: branch || "master",
      type: "ssh",
    };
  }

  const sortRepoRegex = /^(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
  const match = sortRepoRegex.exec(repo);

  if (!match || !match[2] || !match[3]) {
    throw new Error("Invalid repo");
  }

  // default to github / 默认仓库为 github
  const sortGitServer = match[1] || "github";

  // if get a.com/b/c.git, then throw an error
  // 如果传入 a.com/b/c.git这样的格式，则报错
  if (!match[1]) {
    if (match[2].includes("/") || match[3].includes("/")) {
      throw new Error("Invalid repo");
    }
  } else {
    // check if github | gitlab | bitbucket | gitee
    // 检查是否为 github | gitlab | bitbucket | gitee
    if (!Object.keys(sortGitServerOriginMap).includes(sortGitServer)) {
      throw new Error("Invalid repo");
    }
  }

  return {
    url: `https://${
      sortGitServerOriginMap[
        sortGitServer as keyof typeof sortGitServerOriginMap
      ]
    }/${match[2]}/${match[3]}.git`,
    branch: match[4] || "master",
    type: "http",
  };
}
