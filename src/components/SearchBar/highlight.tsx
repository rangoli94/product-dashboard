export function highlight(text: string, query: string) {
    if (!query) return text;
  
    const regex = new RegExp(`(${query})`, "gi");
  
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }
  