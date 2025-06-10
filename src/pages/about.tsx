// Example: Dynamic page that reads Stackbit content
import { createSignal, onMount } from "solid-js";

export default function DynamicPage() {
  const [content, setContent] = createSignal<any>(null);
  
  onMount(async () => {
    // Load content from your JSON files
    const slug = window.location.pathname.slice(1) || "about";
    try {
      const response = await fetch(`/content/pages/${slug}.json`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  });

  return (
    <div>
      <h1>{content()?.title}</h1>
      <div innerHTML={content()?.body} />
    </div>
  );
}
