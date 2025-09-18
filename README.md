For questions and inquiries contact me by maby.garza@gmail.co


# Responsive Navigation Component

## Overview

A fully responsive navigation component built for a non-profit organization website using Next.js, TypeScript, and Tailwind CSS. The navigation automatically adapts between a hamburger menu for mobile/tablet devices and a full navigation bar for desktop screens.

## Features

- **Responsive Design**: Automatically switches between mobile hamburger menu and desktop navigation bar
- **Dropdown Menus**: Expandable submenus for main navigation items
- **Hover Effects**: Smooth transitions with leaf icons on hover
- **Scroll-to-Section**: Automatic scrolling to page sections using anchor IDs
- **Smooth Animations**: CSS transitions for all interactive elements
- **TypeScript**: Fully typed for better development experience

## File Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Main navigation component
│   └── icons/
│       ├── HamburgerIcon.tsx   # Hamburger menu icon
│       ├── CloseIcon.tsx       # Close menu icon
│       └── LeafIcon.tsx        # Decorative leaf icon
├── data/
│   └── menuData.ts            # Navigation menu structure
└── hooks/
    └── useScrollToSection.ts   # Hook for smooth scrolling
```

## Navigation Structure

The navigation supports the following main pages with their respective subpages:

### Main Pages
1. **Home** - Landing page
2. **Events and News** - Events and updates
3. **Plan Your Visit** - Visitor information and maps
4. **Photo Gallery** - Image collections
5. **Support Us** - Membership, donations, volunteering
6. **About Us** - Organization information
7. **Resource Library** - Documents and resources

### Subpages
Each main page (except Home and Photo Gallery) contains subpages that link to specific sections on the main page using anchor IDs.

## Implementation

### 1. Add Navigation to Layout

```typescript
// app/layout.tsx
import Navigation from '@/components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### 2. Create Page Sections with IDs

```typescript
// Example: app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <section id="mission-vision">
        <h2>Mission, Vision, Founding History</h2>
        {/* Content */}
      </section>
      
      <section id="riverview-lands">
        <h2>About Riverview Lands and Finnie's Garden</h2>
        {/* Content */}
      </section>
      
      <section id="achievements">
        <h2>Our Achievements</h2>
        {/* Content */}
      </section>
      
      <section id="memoriam">
        <h2>In Memoriam</h2>
        {/* Content */}
      </section>
    </div>
  );
}
```

### 3. Optional: Use Scroll Hook

```typescript
// In any page component
import { useScrollToSection } from '@/hooks/useScrollToSection';

export default function PageComponent() {
  useScrollToSection(); // Enables smooth scrolling to sections
  
  return (
    // Your page content
  );
}
```

## Customization

### Updating Menu Items

Edit `src/data/menuData.ts` to modify the navigation structure:

```typescript
export const menuData: MenuItem[] = [
  {
    name: "New Page",
    href: "/new-page",
    subPages: [
      { name: "Section 1", href: "/new-page", id: "section-1" },
      { name: "Section 2", href: "/new-page", id: "section-2" },
    ],
  },
  // ... other menu items
];
```

### Styling Customization

The component uses Tailwind CSS classes. Key customization points:

- **Colors**: Change `green-` classes to your brand colors
- **Breakpoints**: Modify `lg:` breakpoints in the component (currently 1024px)
- **Spacing**: Adjust `space-x-` and `space-y-` classes
- **Transitions**: Modify `transition-` and `duration-` classes

### SVG Icons

The component uses three SVG icons located in the `public/` folder:
- `/hambmenu.svg` - Hamburger menu icon
- `/closeicon.svg` - Close menu icon  
- `/leaf.svg` - Decorative leaf icon

To replace icons, simply update the SVG files in the public folder while maintaining the same filenames.

## Responsive Behavior

- **Mobile/Tablet (< 1024px)**: Hamburger menu with slide-out navigation
- **Desktop (≥ 1024px)**: Horizontal navigation bar with dropdown menus

## Browser Support

- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## Dependencies

- Next.js 13+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+

## Contributing

When adding new pages or sections:

1. Update `menuData.ts` with the new navigation items
2. Ensure page sections have matching IDs for scroll functionality
3. Test responsive behavior across different screen sizes
4. Verify accessibility with screen readers

## Troubleshooting

### Smooth Scrolling Not Working
- Ensure section IDs match exactly with the `id` field in `menuData.ts`
- Check that the target page has loaded before scrolling occurs
- Verify the `useScrollToSection` hook is implemented on the target page

### Mobile Menu Not Closing
- Check that all click handlers call `setIsMobileMenuOpen(false)`
- Ensure the mobile menu state is properly managed in the component

### Dropdown Menus Not Appearing
- Verify `z-index` values are not conflicting with other components
- Check that the dropdown positioning is correct for your layout