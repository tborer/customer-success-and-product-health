# Customer Metrics and Product Health Hub

A single-pane-of-glass dashboard for customer success and product teams at an
online learning platform. It blends product analytics (GA4-style event streams)
with backend business data (subscriptions, assessments, B2B seat licences) so
that one screen answers three questions at once:

- **Who is about to churn?** — predictive risk scoring on individual learners.
- **What in the product is causing it?** — per-module friction and drop-off analysis.
- **Which accounts are healthy?** — B2B seat utilisation and ROI against licences sold.

Every widget is clickable and opens a "root cause isolation" drill-down panel,
so a spike in a chart can be traced to the browser, device, or content module
behind it, and then to a suggested remediation workflow.

> **Status: front-end prototype.** All figures come from mock data defined
> inline in the widget components — there is no backend, API, or database.
> See [Current limitations](#current-limitations) for what is presentational
> versus wired up.

## Screens and features

### Learner churn risk (`PredictiveRiskWidget`)
- Risk-score distribution of the learner base, bucketed 0–25% through 76–100%,
  with high-risk buckets colour-coded amber and red.
- Ranked "action required" list of the highest-risk accounts, each showing the
  drop-off signal that triggered it (no recent logins, low assessment score,
  paused course, declining viewing time) alongside days until renewal.
- Renewal dates inside 14 days are highlighted, so risk is prioritised by how
  soon the revenue is actually at stake.
- An **Intervene** action per learner opens the drill-down with their churn
  factors and a retention offer (discount email).

### Content friction and drop-off (`FrictionHeatmapWidget`)
- Module performance matrix across a course, heat-shaded by friction score:
  red above 80, amber above 50, neutral below.
- Per-module average time on page and completion rate, with a progress bar that
  turns red when completion falls under 60%.
- Friction trend chart tracking pause/rewind events per day for the worst
  offending modules, to separate "hard content" from "broken content".
- Correlates engagement spikes with assessment failure rates, calling out where
  rewinds line up with learners failing the quiz.

### B2B seat utilisation (`SeatUtilizationWidget`)
- Total active seats with month-over-month trend.
- Client health matrix listing active users against seats purchased, a
  utilisation percentage, and a status badge that classifies each account as
  *Upsell Ready*, *Healthy*, or *Adoption Risk*.
- Colour-coded utilisation bars make under-adopting accounts (seats paid for but
  unused) visible before renewal conversations.
- Clicking a client opens licence usage and ROI health for QBR prep, with an
  action to send an adoption report to the account admin.

### Root cause drill-down (`DrillDownPanel`)
- Slide-over panel with overlay, rendering a different view depending on what
  was clicked: learner risk, content friction, or B2B utilisation.
- For content friction it performs variable isolation — breaking a drop-off down
  by browser, device, and player event to separate a platform bug from a content
  problem.
- Surfaces suggested next actions (raise an engineering ticket, flag a module
  for content review) behind an "Execute Workflows" action.

### Shell and global controls (`DashboardLayout`, `FilterBar`)
- Automated alert banner across the top of the app for threshold breaches, such
  as a sudden drop in completion rates for a named cohort.
- Role selector for switching perspective between Internal PM, Customer Success,
  and B2B Client views.
- Cohort segment filter (all users, B2C Pro tier, B2B Enterprise, organic
  acquisition) and a reporting date range (30 days, 90 days, year to date).
- Global search for a user or institution, plus notification and settings
  entry points.
- Export cohort to CSV and push to HubSpot CRM actions.
- Dark glassmorphism theme with staggered fade-in animation, driven by CSS
  custom properties in `src/index.css`, and a 12-column grid that collapses to
  single column under 1024px.

## Tech stack

| Concern | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Charts | Recharts 3 |
| Icons | lucide-react |
| Styling | Hand-rolled CSS with custom properties (no CSS framework) |
| Linting | ESLint 10, flat config, with React Hooks and React Refresh plugins |
| Deployment | GitHub Pages via GitHub Actions on push to `main` |

## Getting started

Requires Node.js 20 or newer (CI builds on Node 20).

```bash
npm install     # or: npm ci
npm run dev     # start the dev server with HMR
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

Note that `vite.config.js` sets `base: '/customer-success-and-product-health/'`
for GitHub Pages. If you host this anywhere else, change `base` to match.

## Project structure

```
index.html                  Vite entry document
src/
  main.jsx                  React root
  App.jsx                   Dashboard composition, cohort + drill-down state
  index.css                 Design tokens, theme, shared utility classes
  App.css                   Dashboard grid and widget chrome
  components/
    Layout/
      DashboardLayout.jsx   Alert banner, top nav, role selector
    Interactive/
      FilterBar.jsx         Cohort, date range, export and CRM actions
      DrillDownPanel.jsx    Slide-over root cause panel
    Widgets/
      PredictiveRiskWidget.jsx    Learner churn risk
      FrictionHeatmapWidget.jsx   Content friction and drop-off
      SeatUtilizationWidget.jsx   B2B seat utilisation and ROI
  assets/                   Unused template leftovers (hero.png, react.svg, vite.svg)
public/                     Favicon and icon assets
.github/workflows/deploy.yml  GitHub Pages build and deploy
```

App-level state lives in `App.jsx`: the selected cohort, and the payload of the
currently open drill-down. Widgets report clicks upward via an
`onOpenDrillDown({ type, data })` callback, and the panel switches its rendering
on `type`.

## Current limitations

Useful to know before treating any number on screen as real:

- **Data is mocked.** Each widget defines its own hardcoded arrays; nothing is
  fetched.
- **The cohort filter is not yet applied.** `App.jsx` tracks the selection and
  passes `cohort` to every widget, but the widgets do not read it, so changing
  the segment does not change the figures. Same for the date range, which has no
  state behind it at all.
- **The role selector is local to the layout.** It changes no permissions or
  visible data yet, despite Internal PM and B2B Client being very different
  audiences.
- **Action buttons are presentational.** Export CSV, Sync to HubSpot CRM,
  Execute Workflows, Send Adoption Report, Trigger Discount Email, View All,
  search, notifications, and settings have no handlers attached.
- **The alert banner is static text**, not driven by a threshold rule.
- **`npm run lint` currently reports 10 errors** — unused `React` imports and
  the unused `cohort` props in the three widgets. `npm run build` succeeds.
