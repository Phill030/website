function DiscordAvatar({ id, avatar }: { id: string; avatar: string }) {
  const url = `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=32`;
  return <img src={url} style={{ borderRadius: "50%" }} />;
}

export { DiscordAvatar };
