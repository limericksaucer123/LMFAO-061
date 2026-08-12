// Builds the Simple Analytics script tags at build time.
//
// This replaces the injection that the Simple Analytics Netlify extension used
// to do from an edge function on /*. That edge function loaded a WebAssembly
// HTMLRewriter by fetching it from deno.land on every cold start, and any
// failure of that fetch took down the request with an uncaught exception.
// Rendering the same tags into the page here removes the edge function from the
// request path entirely.
//
// Configuration still comes from the extension's build environment variables,
// matching how the edge function built them:
//   SIMPLE_ANALYTICS_DATA_*         -> data-* attributes on latest.js
//   SIMPLE_ANALYTICS_EVENT_DATA_*   -> data-* attributes on auto-events.js
//   SIMPLE_ANALYTICS_AUTO_COLLECT_EVENTS = "false" disables auto-events.js

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const attributesFrom = (prefix, stripped) =>
  Object.entries(process.env)
    .filter(([key, value]) => key.startsWith(prefix) && value)
    .map(([key, value]) => {
      const name = key.replace(stripped, "").replaceAll("_", "-").toLowerCase();
      return ` ${name}="${escapeAttribute(value)}"`;
    })
    .join("");

module.exports = function () {
  const scripts = [];

  const scriptAttributes = attributesFrom(
    "SIMPLE_ANALYTICS_DATA_",
    "SIMPLE_ANALYTICS_"
  );
  scripts.push(
    `<script async src="https://scripts.simpleanalyticscdn.com/latest.js"${scriptAttributes}></script>`
  );

  if (process.env.SIMPLE_ANALYTICS_AUTO_COLLECT_EVENTS !== "false") {
    const eventAttributes = attributesFrom(
      "SIMPLE_ANALYTICS_EVENT_DATA_",
      "SIMPLE_ANALYTICS_EVENT_"
    );
    scripts.push(
      `<script async src="https://scripts.simpleanalyticscdn.com/auto-events.js"${eventAttributes}></script>`
    );
  }

  return { scripts: scripts.join("\n  ") };
};
