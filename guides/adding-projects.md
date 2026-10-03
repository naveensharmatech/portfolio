# Adding a Project

Open `src/App.jsx` and add an object to `FEATURED_PROJECTS` (flagship) or `EARLIER_PROJECTS`.

```js
{
  title: "Project Name",
  tag: "Category · Detail",
  desc: "One or two sentences on the problem, approach and outcome.",
  architecture: ["Trigger", "Step", "Step", "Output"],
  skills: ["Tool A", "Tool B"],
  links: [
    { href: "https://...", label: "Case Study", type: "site" },
    { href: "https://github.com/...", label: "GitHub", type: "code" },
  ],
}
```

Link `type` values used in the file include `site`, `code`, `example` and `linkedin`. Copy an existing entry to match the shape for the list you edit (`EARLIER_PROJECTS` entries use a smaller set of fields).

Then run `npm run build`, check it locally, and push. Consider updating Ella's prompt in `functions/api/chat.js` so she knows about the project.
