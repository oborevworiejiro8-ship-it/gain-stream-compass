# Production Readiness & Issue Resolution Plan

This plan outlines the steps to identify and fix bugs, missing features, design inconsistencies, responsiveness issues, performance bottlenecks, and security concerns to prepare the application for production.

## Scope & Non-Goals
- **Scope:** Full audit and fix of the existing React/Vite application.
- **Non-Goals:** Building a completely different application or adding massive new business verticals (e.g., a full e-commerce backend).

## Audit Findings (Anticipated)
- **Bugs:** State persistence during wizard, form validation, edge cases in scoring logic.
- **Missing Features:** Meta tags (SEO), dynamic titles, error boundaries, loading states, local storage persistence for results.
- **Design:** Accessibility (ARIA), consistent spacing/typography, dark mode refinements.
- **Mobile:** Touch targets, horizontal overflow, responsive image scaling.
- **Performance:** Image optimization, bundle analysis (if applicable), redundant re-renders.
- **Security:** Sanitization of user inputs, secure external links (rel="noopener").

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read
**RLS strategy:** N/A (Client-side logic only for now)
**Frontend implication:** No auth session required.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Phases

### 1. Audit & Polish (frontend_engineer)
- **Task:** Perform a deep dive into `App.tsx`, `ProfilingWizard.tsx`, and `OpportunityCard.tsx`.
- **Deliverables:**
    - Fix mobile responsiveness in the hero section and results grid.
    - Implement form validation in the `ProfilingWizard`.
    - Add `localStorage` persistence so users don't lose results on refresh.
    - Add meta tags and SEO improvements to `index.html`.
    - Improve accessibility (aria-labels, focus states).
    - Add a global Error Boundary and "Not Found" state.

### 2. UI/UX Refinement (quick_fix_engineer)
- **Task:** Cleanup CSS and micro-interactions.
- **Deliverables:**
    - Consistent padding/margins across sections.
    - Fix any typos in `opportunities.ts` or UI text.
    - Ensure dark mode (if enabled in CSS) looks professional or fix the oklch variable mappings if they clash.

### 3. Production Hardening (frontend_engineer)
- **Task:** Final production readiness.
- **Deliverables:**
    - Optimize images (use correct sizes/formats).
    - Add `robots.txt` and `sitemap.xml` (basic).
    - Ensure all Lucide icons are correctly imported and used.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Address core logic, responsiveness, and state persistence.
2. quick_fix_engineer — Polish UI, text, and minor CSS inconsistencies.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1 and 3
- **Scope:** 
    - Fix mobile layout for the hero image and recommendations grid.
    - Implement `localStorage` for the `profile` and `view` states in `App.tsx`.
    - Add validation to `ProfilingWizard` fields (age, hours, etc.).
    - Update `index.html` with proper title, description, and OpenGraph tags.
    - Add a simple ErrorBoundary component to wrap `App`.
    - Add `robots.txt` and a basic `sitemap.xml`.
- **Files:** `src/App.tsx`, `src/components/ProfilingWizard.tsx`, `index.html`, `src/main.tsx`, `public/robots.txt`, `public/sitemap.xml`
- **Depends on:** none
- **Acceptance criteria:** App works on mobile without horizontal scroll; assessment results survive page refresh; meta tags are present; invalid wizard inputs are blocked.

### 2. quick_fix_engineer
- **Phases:** 2
- **Scope:**
    - Review `src/index.css` for any variables that look broken (e.g., oklch values that might be too dark/light).
    - Standardize spacing between landing page sections.
    - Fix any identified typos in `src/data/opportunities.ts`.
- **Files:** `src/index.css`, `src/data/opportunities.ts`
- **Depends on:** frontend_engineer (Phase 1)
- **Acceptance criteria:** Visual consistency across all screen sizes; no typos in data; accessible color contrast.

**Do not dispatch:** 
- supabase_engineer (no backend persistence required for this scope).
