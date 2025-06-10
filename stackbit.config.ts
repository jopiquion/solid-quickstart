// stackbit.config.ts
import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // Your other config options here...

  contentSources: [
    new GitContentSource({
      rootPath: https://github.com/jopiquion/solid-quickstart,
      contentDirs: ["/main"],
      models: [
        {
          name: "Page",
          type: "page", // indicates this model represents a page editable in Visual Editor
          urlPath: "/{slug}", // static URL path using slug field from content
          filePath: "content/pages/{slug}.json", // file location for this page's content
          fields: [
            { name: "title", type: "string", required: true },
            // add other fields here as needed
          ]
        },

        // You can define other models, e.g. Blog, Product, etc.
        /*
        {
          name: "Blog",
          type: "page",
          urlPath: "/blog/{slug}",
          filePath: "content/blog/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown", required: true }
          ]
        }
        */
      ],
    })
  ],

  siteMap: ({ documents, models }) => {
    // Filter only page models
    const pageModels = models.filter(m => m.type === "page");

    return documents
      // Only docs that match a page model
      .filter(d => pageModels.some(m => m.name === d.modelName))
      // Map each doc to a SiteMapEntry with URL paths
      .map(document => {
        // Example of custom URL path logic if needed
        // You can adjust based on your models and routing

        let urlPath = null;
        switch (document.modelName) {
          case "Page":
            // Use slug or id to build URL dynamically if needed
            urlPath = `/${document.slug || document.id}`;
            break;
          // case "Blog":
          //   urlPath = `/blog/${document.slug || document.id}`;
          //   break;
          default:
            urlPath = null;
        }

        if (!urlPath) return null;

        return {
          stableId: document.id,
          urlPath,
          document,
          isHomePage: urlPath === "/", // mark homepage if needed
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  },
});
