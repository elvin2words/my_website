# Pages AddOns

- Privacy policy
- Terms of Service
- ~~Contact - WA, Call,~~
- Page for Code Circle - convert portfolio_cc

  * Port styles from `style.css` to `tailwind.config.js` and Tailwind classes

    * HTML to JSX
    * CSS classes to classNames
    * DOM-based JS to React hooks & state
  * Fix legacy CSS as a separate file since it conflicts.
  * Navigation Override Strategy

    * disable the default navigation in layout using a flag (`noNav: true`) in route metadata?
    * create a `fullscreen` layout where `CodeCirclePage.tsx` uses its own nav?
  * If main layout includes navigation (`<Navbar />`), add a flag:

    * // In CodeCirclePage.tsx
      CodeCirclePage.noNav = true; // or CodeCirclePage.layout = 'fullscreen'
    * // Then in your `App.tsx` or `Layout.tsx`, check:
      {!Component.noNav && `<MainNavigation />`}
    * JavaScript logic in React:
      Nav toggling (hamburger menu),
      Project filtering,
      Typing animations,
      Scroll behavior,
      Preloader behavior, etc.)
- Page for Design Circle
- Page for Biz Circle
- SeeMyWork Page - All Circles

# Features

- Search - AI powered referencing to the site and everything else
- FAB Search AI for mobile
- PortfolioCC Integration for CodeCircle Portfolio
- ~~Make identity cards clickable anywhere~~
- mutliprojectrepo integration into portfolio_cc
- PDF Resume Button and Resume Presentation in web, with download button
- Download Contact Card
- Hire Elvin Link
- Light and Dark Mode Support
- Scroll To Top across all Pages
- For Developer, Designer, Technopreneur

  - Use startup logos/icons if available;
  - Add "Live Projects" or "Launches in Progress" status tags.
  - Add download or showcase buttons for each project preview.
  - Include links to live demos / GitHub / Behance in future version.
  - Add mini  **"status chips"** : `beta`, `shipped`, `R&D`, `in prototype`
  - Make project cards **collapsible or modal-powered**

# Bugs

- ~~Fix the blurrty overlay for sidepanel which only happens for hero section veiw lookin~~
- Redo readme file
- ~~Review IdentitySections data and run through ChatGPT~~
- Review info on each Identity Card
- Fix contact popup leftmost margin in footer
- Fix components rendering in the pages, make them smoother - Animate the Section Entrances : Add `framer-motion` to animate cards on scroll.
