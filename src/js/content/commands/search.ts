export function search(text: string) {
  const searchText = text.replace(/(search|^(for))/g, "");
  window.location.href = `https://youtube.com/results?search_query=${encodeURIComponent(
    searchText
  )}`;
}
