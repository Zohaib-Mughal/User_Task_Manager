export default function TruncatedText({ text, limit }) {
  const truncatedText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: truncatedText,
      }}
    />
  );
}
