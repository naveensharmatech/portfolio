# Content Customization

## Update Content

All content is in `src/App.jsx` data constants:

```javascript
const EXPERIENCES = [
  {
    company: "Your Company",
    period: "2024 – Present",
    roles: ["Role"],
    points: [{label: "Achievement", text: "Details"}]
  }
];
```

## Update Projects

```javascript
const PROJECTS = [
  {
    title: "Project Name",
    desc: "Description",
    skills: ["Skill1", "Skill2"]
  }
];
```

## Update Ella AI Prompt

Edit `functions/api/chat.js` SYSTEM_PROMPT
