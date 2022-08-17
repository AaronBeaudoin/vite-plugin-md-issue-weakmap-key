import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import Page from "/components/Markdown.md";

export const pages = {
  "/": "home"
};

async function render(name) {
  if (name === "home") {
    const page = createSSRApp({ render: _ => h(Page, {}) });
    const pageHtml = await renderToString(page);
    return pageHtml;
  }
}

export async function renderPage(pageContext) {
  const path = new URL("http://localhost" + pageContext.url).pathname;
  const html = _ => `<html><body><div id="page">${_}</div></body></html>`;

  if (path in pages) {
    return {
      httpResponse: {
        statusCode: 200,
        contentType: "text/html",
        body: html(await render(pages[path]))
      }
    };
  } else {
    return {
      httpResponse: null
    };
  }
}
