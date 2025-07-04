export type splitedUserTagType = {
name: string;
level: string;
};

export const nameTagList = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Next.js",
  "React",
  "Flutter",
  "Python",
  "Unity",
  "Rust"
];

export const levelTagList = [
  "初心者",
  "中級者",
  "上級者",
  "Hello,Worldの住人",
  "エキスパート",
  "チョットデキテル"
];

export const splitUserAllTags = (tags: string[]) => {
  return tags.map(tag => splitUserTag(tag));
};

export const splitUserTag = (tag: string) => {
  const name = nameTagList.find(name => tag.includes(name));
  const level = levelTagList.find(level => tag.includes(level));
  return { name: name || "", level: level || "" } as splitedUserTagType;
};
