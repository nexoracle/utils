interface EmojiInfo {
  emoji: string;
  name: string;
  group: EmojiGroup;
  sub_group: EmojiSubGroup;
  codepoints: string;
}

let emojiList: EmojiInfo[];
const emojiCache = new Map<string, Emoji>();
let cachedAll: Emoji[], groupedEmojis: Record<EmojiGroup, Emoji[]>;

export type EmojiGroup = "Smileys & Emotion" | "People & Body" | "Animals & Nature" | "Food & Drink" | "Travel & Places" | "Activities" | "Objects" | "Symbols" | "Flags";
export type EmojiSubGroup =
  | "face-smiling"
  | "face-affection"
  | "face-tongue"
  | "face-hand"
  | "face-neutral-skeptical"
  | "face-sleepy"
  | "face-unwell"
  | "face-hat"
  | "face-glasses"
  | "face-concerned"
  | "face-negative"
  | "face-costume"
  | "cat-face"
  | "monkey-face"
  | "emotion"
  | "hand-fingers-open"
  | "hand-fingers-partial"
  | "hand-single-finger"
  | "hand-fingers-closed"
  | "hands"
  | "hand-prop"
  | "body-parts"
  | "person"
  | "person-gesture"
  | "person-role"
  | "person-fantasy"
  | "person-activity"
  | "person-sport"
  | "person-resting"
  | "family"
  | "person-symbol"
  | "animal-mammal"
  | "animal-bird"
  | "animal-amphibian"
  | "animal-reptile"
  | "animal-marine"
  | "animal-bug"
  | "plant-flower"
  | "plant-other"
  | "food-fruit"
  | "food-vegetable"
  | "food-prepared"
  | "food-asian"
  | "food-marine"
  | "food-sweet"
  | "drink"
  | "dishware"
  | "place-map"
  | "place-geographic"
  | "place-building"
  | "place-religious"
  | "place-other"
  | "transport-ground"
  | "transport-water"
  | "transport-air"
  | "hotel"
  | "time"
  | "sky & weather"
  | "event"
  | "award-medal"
  | "sport"
  | "game"
  | "arts & crafts"
  | "clothing"
  | "sound"
  | "music"
  | "musical-instrument"
  | "phone"
  | "computer"
  | "light & video"
  | "book-paper"
  | "money"
  | "mail"
  | "writing"
  | "office"
  | "lock"
  | "tool"
  | "science"
  | "medical"
  | "household"
  | "other-object"
  | "transport-sign"
  | "warning"
  | "arrow"
  | "religion"
  | "zodiac"
  | "av-symbol"
  | "gender"
  | "math"
  | "punctuation"
  | "currency"
  | "other-symbol"
  | "keycap"
  | "alphanum"
  | "geometric"
  | "flag"
  | "country-flag"
  | "subdivision-flag";

class Emoji {
  constructor(private readonly data: EmojiInfo) {}

  get emoji() {
    return this.data.emoji;
  }

  get name() {
    return this.data.name;
  }

  get formattedName() {
    return this.data.name
      .split(" ")
      .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(" ");
  }

  get group() {
    return this.data.group;
  }

  get subGroup() {
    return this.data.sub_group;
  }

  get codePoints() {
    return this.data.codepoints.split(" ");
  }

  twemoji(opts?: { size?: string; format?: "png" | "svg" }) {
    const { format = "png", size = "120x120" } = opts ?? {};
    const code = this.toUnicode().toLowerCase();
    return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/${format === "svg" ? "svg" : size}/${code}.${format}`;
  }

  get fancyName() {
    return `:${this.name.replace(/\W/g, "_").toLowerCase()}:`;
  }

  toUnicode() {
    return emojiApi.emojiToUnicode(this.emoji);
  }

  toString() {
    return this.emoji;
  }

  toArray() {
    return [this.toJSON()];
  }

  static from(data: EmojiInfo) {
    return new Emoji(data);
  }

  toJSON() {
    return {
      ...this.data,
      fancyName: this.fancyName,
      twemoji: this.twemoji(),
      unicode: this.toUnicode(),
      formattedName: this.formattedName,
    };
  }
}

const fetchEmojis = async (): Promise<EmojiInfo[]> => {
  if (emojiList) return emojiList;

  try {
    const response = await fetch("https://cdn.jsdelivr.net/gh/maher-xubair/emojiApi/emojis-data.json");
    emojiList = await response.json();
    return emojiList;
  } catch (error) {
    console.error("Failed to fetch emoji data:", error);
    throw error;
  }
};

const emojiApi = {
  async all(): Promise<Emoji[]> {
    if (cachedAll) return cachedAll;
    const data = await fetchEmojis();
    return (cachedAll = data.map((d) => new Emoji(d)));
  },

  async arrange(): Promise<Record<EmojiGroup, Emoji[]>> {
    if (groupedEmojis) return groupedEmojis;
    const allEmojis = await this.all();
    groupedEmojis = {} as Record<EmojiGroup, Emoji[]>;

    for (const emoji of allEmojis) {
      const group = emoji.group;
      groupedEmojis[group] ? groupedEmojis[group].push(emoji) : (groupedEmojis[group] = [emoji]);
    }

    return groupedEmojis;
  },

  async get(emoji: string): Promise<Emoji | null> {
    if (emojiCache.has(emoji)) return emojiCache.get(emoji) || null;
    const allEmojis = await this.all();
    const found = allEmojis.find((e) => e.emoji === emoji);
    if (!found) return null;
    emojiCache.set(emoji, found);
    return found;
  },

  async filter(fn: (emoji: Emoji) => boolean): Promise<Emoji[]> {
    const allEmojis = await this.all();
    return allEmojis.filter(fn);
  },

  async random(): Promise<Emoji> {
    const allEmojis = await this.all();
    return allEmojis[Math.floor(Math.random() * allEmojis.length)];
  },

  async randomFromGroup(group: EmojiGroup, subGroup?: EmojiSubGroup): Promise<Emoji> {
    const allEmojis = await this.all();
    const filtered = allEmojis.filter((e) => e.group.toLowerCase() === group.toLowerCase() && (!subGroup || e.subGroup.toLowerCase() === subGroup.toLowerCase()));
    return filtered[Math.floor(Math.random() * filtered.length)];
  },

  async findByName(name: string): Promise<Emoji | null> {
    const allEmojis = await this.all();
    const found = allEmojis.find((e) => e.name.toLowerCase() === name.toLowerCase());
    return found || null;
  },

  emojiToUnicode(emoji: string): string {
    if (emoji.length === 1) return emoji.charCodeAt(0).toString(16);
    const code = (emoji.charCodeAt(0) - 0xd800) * 0x400 + (emoji.charCodeAt(1) - 0xdc00) + 0x10000;
    return code < 0 ? emoji.charCodeAt(0).toString(16) : code.toString(16).toUpperCase();
  },

  unicodeToEmoji(unicode: string): string {
    return String.fromCodePoint(parseInt(unicode, 16));
  },
};

export default emojiApi;
