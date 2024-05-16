export default function getEmoji(emoji: string, style: "color" | "flat" | "high-contrast" = "color"): string {
    let emojiCode = [...emoji].map((e) => e.codePointAt(0)?.toString(16)).join('-')
    return `https://fluent-emoji.ciffelia.com/${emojiCode}_${style}.svg`
}
