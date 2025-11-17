# CLAUDE.md - AI Assistant Guide for "To Skomplikowane"

## Project Overview

**To Skomplikowane** is a Next.js-based marketing website for an AI/automation consulting company targeting small Polish businesses. The site showcases three main services through an interactive UI with simulated chatbot experiences.

- **Project Name:** To Skomplikowane (Polish: "That's Complicated")
- **Purpose:** AI/automation consulting services for SMBs
- **Language:** Polish (UI, content)
- **Deployment:** GitHub Pages (static export)
- **Custom Domain:** Yes (via CNAME)

## Tech Stack

### Core Framework
- **Next.js 14.2.25** with App Router
- **React 19** (latest)
- **TypeScript 5** (strict mode enabled)
- **Node.js 20** (CI/CD environment)

### UI & Components
- **Radix UI** (27+ primitive components for accessibility)
- **shadcn/ui** (57 pre-built styled components)
- **Lucide React** (icon library)
- **Class Variance Authority** (component variant management)

### Styling
- **Tailwind CSS 3.4.17** (utility-first)
- **PostCSS 8.5** + **Autoprefixer 10.4.20**
- **Tailwind Merge** (smart class merging via `cn()` utility)
- **CSS Variables** (HSL-based color system for theming)

### Fonts
- **Geist Sans & Mono** (from Vercel)
- **EB Garamond** (Google Fonts - serif for headings)

### Forms & Validation
- **React Hook Form 7.54.1** (form state management)
- **Zod 3.24.1** (TypeScript-first schema validation)
- **@hookform/resolvers** (integration layer)

### Interactive Components
- **Embla Carousel** (image carousels)
- **React Day Picker** (calendar UI)
- **Recharts** (charting)
- **Sonner** (toast notifications)
- **next-themes** (dark/light mode support)
- **Vaul** (drawer component)

### Package Management
- **pnpm** (fast, disk-efficient package manager)

### Analytics
- **@vercel/analytics** (web analytics)

## Directory Structure

```
/home/user/toskomplikowane/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (fonts, theme provider)
│   ├── page.tsx             # Home page (main landing page)
│   └── globals.css          # Global styles + Tailwind directives
├── components/
│   ├── ui/                  # 57 shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx
│   │   └── ... (50+ more)
│   ├── chatbot-modal.tsx    # Custom client component (service chatbot)
│   ├── contact-form.tsx     # Custom client component (contact form)
│   ├── service-cards.tsx    # Custom client component (service display)
│   └── theme-provider.tsx   # Theme wrapper (next-themes)
├── hooks/
│   ├── use-toast.ts         # Toast notification hook
│   └── use-mobile.tsx       # Mobile detection hook
├── lib/
│   └── utils.ts             # Utility functions (cn(), etc.)
├── public/                  # Static assets
│   ├── icon.svg
│   ├── placeholder-*.svg/png/jpg
│   └── ...
├── styles/
│   └── globals.css          # Legacy/backup stylesheet
├── .github/
│   └── workflows/
│       └── nextjs.yml       # CI/CD for GitHub Pages
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json          # shadcn/ui configuration
├── CNAME                    # Custom domain configuration
└── README.md
```

## Configuration Files

### TypeScript (`tsconfig.json`)
- ES6 target
- Strict mode enabled
- JSX: "preserve" (Next.js handles compilation)
- Module resolution: "bundler"
- **Path alias:** `@/*` → root directory

### Next.js (`next.config.mjs`)
```javascript
{
  output: 'export',              // Static HTML export for GitHub Pages
  images: { unoptimized: true }, // No image optimization (static site)
  basePath: ''                   // Custom domain (no base path)
}
```

### Tailwind (`tailwind.config.ts`)
- Dark mode via CSS class (`.dark`)
- HSL-based CSS variable color system
- Custom fonts via CSS variables
- Extended animations (accordion, etc.)
- Content paths: `./app/**/*.{js,ts,jsx,tsx,mdx}`, `./components/**/*.{js,ts,jsx,tsx,mdx}`

### shadcn/ui (`components.json`)
```json
{
  "style": "default",
  "rsc": true,                   // React Server Components enabled
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Development Workflow

### Installation
```bash
pnpm install --frozen-lockfile
```

### Development Server
```bash
pnpm dev
# Runs on http://localhost:3000
```

### Building
```bash
pnpm build
# Generates static export in ./out directory
```

### Linting
```bash
pnpm lint
# Uses Next.js default ESLint configuration
```

### Production Server (Local)
```bash
pnpm start
# Serves production build
```

## Deployment

### GitHub Actions Workflow (`.github/workflows/nextjs.yml`)

**Trigger:** Push to `main` branch or manual dispatch

**Build Steps:**
1. Checkout code
2. Setup pnpm (latest)
3. Setup Node.js 20 with cache
4. Restore .next/cache
5. `pnpm install --frozen-lockfile`
6. `pnpm build`
7. Upload `./out` artifact

**Deploy Steps:**
1. Deploy to GitHub Pages
2. Environment: `github-pages`

**Important:** This is a **static site** - no server-side rendering at runtime.

## Component Patterns

### UI Components (shadcn/ui)

All UI components in `/components/ui/` follow these patterns:

1. **Radix UI Base:** Built on Radix UI primitives for accessibility
2. **Tailwind Styling:** Class-based styling with Tailwind utilities
3. **Compound Components:** Export sub-components separately
4. **Ref Forwarding:** Use `React.forwardRef` for DOM access
5. **Variant Management:** Use CVA for style variants

**Example:**
```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium...',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        // ...
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Custom Components

Custom components in `/components/` (not in `/ui/`) follow these patterns:

1. **Client Components:** Use `"use client"` directive (required for interactivity)
2. **TypeScript Props:** Define `ComponentNameProps` interface
3. **State Management:** Use `useState` for local state
4. **Event Handlers:** Use descriptive names (`onClose`, `onSubmit`, etc.)

**Example:**
```tsx
// components/chatbot-modal.tsx
"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ChatbotModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  initialMessage: string
}

export function ChatbotModal({ isOpen, onClose, title, initialMessage }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([])
  // Component logic...
}
```

### Form Components

Forms use **React Hook Form** + **Zod** pattern:

```tsx
"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Define schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki' }),
  email: z.string().email({ message: 'Nieprawidłowy adres email' }),
  // ...
})

type FormData = z.infer<typeof formSchema>

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      // ...
    },
  })

  const onSubmit = async (data: FormData) => {
    setStatus({ type: 'loading' })
    // Handle submission...
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  )
}
```

## Styling Conventions

### CSS Architecture

1. **CSS Variables for Colors (HSL-based):**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --accent: 210 40% 96%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

2. **Tailwind Utility Classes:**
   - Use utilities directly in JSX: `className="bg-primary text-white px-4 py-2 rounded-md"`
   - For conditional classes, use `cn()` helper:
     ```tsx
     <div className={cn('base-classes', variant === 'large' && 'extra-classes')} />
     ```

3. **Typography:**
   - Headings (h1-h3): Serif font (`font-serif` - EB Garamond)
   - Subheadings (h4-h6): Sans-serif font (`font-sans` - Geist Sans)
   - Body text: Sans-serif font (default)
   - Code/monospace: `font-mono` (Geist Mono)

4. **Color Palette:**
   - **Primary:** Navy blue (`bg-primary`, `text-primary`)
   - **Accent:** Yellow (`bg-yellow-500`, `text-yellow-500`)
   - **Neutral:** Grays (`bg-gray-100`, `text-gray-600`)
   - **Semantic:** `bg-destructive`, `bg-muted`, `bg-accent`

### The `cn()` Utility

Located in `/lib/utils.ts`:
```tsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
- Combines multiple class names
- Merges conflicting Tailwind classes intelligently
- Handles conditional classes

```tsx
<Button className={cn('bg-blue-500', isActive && 'bg-green-500')} />
// Result: 'bg-green-500' (green overrides blue when active)
```

## Path Aliases

**Configure imports with `@/` prefix:**

```tsx
// Instead of:
import { Button } from '../../../../components/ui/button'

// Use:
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
```

**Available aliases:**
- `@/components` → `/components`
- `@/components/ui` → `/components/ui`
- `@/lib` → `/lib`
- `@/hooks` → `/hooks`
- `@/app` → `/app`

## Naming Conventions

### Files
- **Components:** PascalCase (`ContactForm.tsx`, `ChatbotModal.tsx`)
- **UI Components:** lowercase-kebab-case (`button.tsx`, `alert-dialog.tsx`)
- **Hooks:** lowercase-kebab-case with `use` prefix (`use-toast.ts`, `use-mobile.tsx`)
- **Utilities:** lowercase (`utils.ts`)
- **Pages:** lowercase (`page.tsx`, `layout.tsx`)

### TypeScript
- **Component Props:** `ComponentNameProps` interface
  ```tsx
  interface ChatbotModalProps { /* ... */ }
  ```
- **Types/Unions:** PascalCase
  ```tsx
  type ServiceType = 'ai-agents' | 'automation' | 'optimization' | null
  ```
- **Status Enums:** String literal unions
  ```tsx
  type Status = 'idle' | 'loading' | 'success' | 'error'
  ```

### Functions
- **Components:** PascalCase (`export function ContactForm`)
- **Hooks:** camelCase with `use` prefix (`export function useToast`)
- **Utilities:** camelCase (`export function cn`)
- **Event Handlers:** `on` prefix (`onSubmit`, `onClick`, `onClose`)

## State Management

**Current Pattern:** Local component state with `useState`

This is a **static marketing site** with no:
- API routes
- Database
- Global state management library (Redux, Zustand, etc.)
- Server-side data fetching

**Client-side state examples:**
```tsx
// Modal open/close state
const [isOpen, setIsOpen] = useState(false)

// Form submission status
const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

// Chat messages
const [messages, setMessages] = useState<Message[]>([])

// Active service selection
const [activeModal, setActiveModal] = useState<ServiceType>(null)
```

**When to use what:**
- **useState:** All local component state (current pattern)
- **React Hook Form:** Form state (already implemented)
- **Context API:** If you need to share state across distant components (not currently used)

## Adding New Components

### Adding a shadcn/ui Component

```bash
# Use npx to add a new component
npx shadcn@latest add [component-name]

# Example:
npx shadcn@latest add accordion
npx shadcn@latest add dropdown-menu
```

This will:
1. Download the component to `/components/ui/`
2. Install any required dependencies
3. Update `components.json` if needed

### Creating a Custom Component

1. **Create file in `/components/`** (not `/components/ui/`)
2. **Add `"use client"` directive if interactive**
3. **Define TypeScript interface for props**
4. **Use existing UI components from `/components/ui/`**
5. **Follow existing patterns** (see ChatbotModal, ContactForm)

**Example:**
```tsx
// components/newsletter-form.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NewsletterFormProps {
  onSubmit: (email: string) => void
}

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState('')

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(email) }}>
      <Input
        type="email"
        placeholder="Twój email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Zapisz się</Button>
    </form>
  )
}
```

## Working with Forms

**Standard Pattern:** React Hook Form + Zod

### Setup
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
```

### Define Schema
```tsx
const formSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres email' }),
  name: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki' }),
  message: z.string().min(10, { message: 'Wiadomość musi mieć co najmniej 10 znaków' }),
})

type FormData = z.infer<typeof formSchema>
```

### Initialize Form
```tsx
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: '',
    name: '',
    message: '',
  },
})
```

### Render Form
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="twoj@email.pl" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Wyślij</Button>
  </form>
</Form>
```

## Accessibility Guidelines

This project uses Radix UI, which provides excellent accessibility out-of-the-box. Follow these practices:

1. **ARIA Labels:** Use `aria-label` for icon-only buttons
   ```tsx
   <Button aria-label="Zamknij modal" variant="ghost" size="icon">
     <X className="h-4 w-4" />
   </Button>
   ```

2. **Form Labels:** Always pair inputs with labels
   ```tsx
   <FormLabel htmlFor="email">Email</FormLabel>
   <Input id="email" type="email" {...field} />
   ```

3. **Required Fields:** Mark with `aria-required` or `required` attribute
   ```tsx
   <Input required aria-required="true" />
   ```

4. **Decorative Icons:** Hide from screen readers
   ```tsx
   <Sparkles className="h-6 w-6" aria-hidden="true" />
   ```

5. **Focus Management:** Ensure keyboard navigation works
   - Radix UI components handle this automatically
   - Test with Tab key

6. **Color Contrast:** Use semantic color variables
   - `text-foreground` on `bg-background` (meets WCAG AA)
   - `text-primary-foreground` on `bg-primary`

## Content Language

**All UI content is in Polish.** When adding new features:

### Common Polish UI Terms
- **Buttons:**
  - "Wyślij" (Submit)
  - "Zamknij" (Close)
  - "Zapisz" (Save)
  - "Anuluj" (Cancel)
  - "Dowiedz się więcej" (Learn more)

- **Forms:**
  - "Imię" (Name)
  - "Email" (Email)
  - "Wiadomość" (Message)
  - "Firma" (Company)
  - "Wymagane" (Required)

- **Status Messages:**
  - "Wysyłanie..." (Sending...)
  - "Sukces!" (Success!)
  - "Błąd" (Error)
  - "Wypełnij to pole" (Fill this field)

- **Services:**
  - "Dedykowane Agenty AI" (Dedicated AI Agents)
  - "Automatyzacja Procesów" (Process Automation)
  - "Optymalizacja Wydajności" (Performance Optimization)

## Common Tasks for AI Assistants

### Task 1: Adding a New Service Card

1. **Update `ServiceType` in `components/service-cards.tsx`:**
   ```tsx
   type ServiceType = 'ai-agents' | 'automation' | 'optimization' | 'new-service' | null
   ```

2. **Add new service object to `SERVICES` array:**
   ```tsx
   {
     id: 'new-service',
     title: 'Nowa Usługa',
     description: 'Opis nowej usługi',
     icon: IconComponent, // from lucide-react
     color: 'text-purple-500',
     bgGradient: 'from-purple-500/20 to-purple-600/10'
   }
   ```

3. **Add bot responses in `components/chatbot-modal.tsx`:**
   ```tsx
   const BOT_RESPONSES = {
     'new-service': {
       greeting: 'Witaj! Opowiem Ci o nowej usłudze...',
       questions: [/* ... */],
       answers: {/* ... */}
     }
   }
   ```

### Task 2: Adding a New Page

1. **Create file in `/app/` directory:**
   ```tsx
   // app/about/page.tsx
   import { Metadata } from 'next'

   export const metadata: Metadata = {
     title: 'O nas - To Skomplikowane',
     description: 'Poznaj nasz zespół',
   }

   export default function AboutPage() {
     return (
       <main className="container mx-auto px-4 py-16">
         <h1 className="text-4xl font-bold font-serif">O nas</h1>
         {/* Content */}
       </main>
     )
   }
   ```

2. **Add navigation link in `app/page.tsx` or create a header component**

### Task 3: Updating Styles/Colors

1. **Edit `app/globals.css`** to change CSS variables:
   ```css
   :root {
     --primary: 220 70% 50%; /* Change hue, saturation, lightness */
   }
   ```

2. **Update `tailwind.config.ts`** for custom utilities:
   ```ts
   extend: {
     colors: {
       'brand': 'hsl(var(--primary))',
     }
   }
   ```

### Task 4: Adding a Toast Notification

```tsx
import { useToast } from '@/hooks/use-toast'

export function MyComponent() {
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: 'Sukces!',
      description: 'Operacja zakończona pomyślnie',
      variant: 'default', // or 'destructive'
    })
  }

  return <Button onClick={showToast}>Pokaż powiadomienie</Button>
}
```

### Task 5: Making a Component Responsive

Use Tailwind breakpoint prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>

<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  {/* Responsive text sizing */}
</h1>
```

## Testing & Quality Assurance

### Manual Testing Checklist
- [ ] Forms submit correctly
- [ ] Validation errors display properly
- [ ] Modals open and close
- [ ] Buttons have hover states
- [ ] Links navigate correctly
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1440px)
- [ ] Dark mode works (if enabled)
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] No console errors
- [ ] Polish language correct (grammar, spelling)

### Build Verification
```bash
# Always verify build succeeds before pushing
pnpm build

# Check output in ./out directory
# Verify no TypeScript errors
# Verify no build warnings
```

### Linting
```bash
pnpm lint
# Fix any ESLint errors before committing
```

## Git Workflow

### Branch Strategy
- **Main branch:** `main` (protected, triggers deployment)
- **Feature branches:** `claude/[description]-[session-id]`
- **NEVER push directly to main** without PR review

### Commit Messages
Follow conventional commit format:
```
feat: Add new service card for AI consulting
fix: Resolve form validation bug in contact form
style: Update button hover states
refactor: Simplify chatbot modal logic
docs: Update CLAUDE.md with new patterns
```

### Before Pushing
1. Run `pnpm build` to verify build succeeds
2. Run `pnpm lint` to check for errors
3. Test locally with `pnpm dev`
4. Review changed files
5. Write clear commit message

### Creating a Pull Request
```bash
# Push feature branch
git push -u origin claude/[branch-name]-[session-id]

# Create PR via GitHub UI or CLI
# Include:
# - Clear description of changes
# - Screenshots (if UI changes)
# - Testing steps performed
```

## Troubleshooting

### Common Issues

**Issue:** "Cannot find module '@/components/...'"
- **Solution:** Check `tsconfig.json` has path alias configured
- Restart TypeScript server in IDE

**Issue:** Build fails with TypeScript errors
- **Solution:** Run `pnpm build` locally to see full error
- Check for missing imports or type errors
- Verify all components have proper TypeScript types

**Issue:** Styles not applying
- **Solution:** Check Tailwind class names are correct
- Verify `globals.css` imports Tailwind directives
- Clear `.next` cache: `rm -rf .next && pnpm dev`

**Issue:** Component not rendering
- **Solution:** Check if it needs `"use client"` directive
- Verify imports are correct
- Check browser console for errors

**Issue:** Form validation not working
- **Solution:** Verify Zod schema is correct
- Check `zodResolver` is imported
- Ensure `FormMessage` component is included in form field

### Getting Help
- Check Next.js docs: https://nextjs.org/docs
- Check Radix UI docs: https://www.radix-ui.com/
- Check shadcn/ui docs: https://ui.shadcn.com/
- Check Tailwind CSS docs: https://tailwindcss.com/docs

## Important Notes for AI Assistants

### DO:
- ✅ Use existing UI components from `/components/ui/`
- ✅ Follow established naming conventions
- ✅ Write in Polish for all user-facing content
- ✅ Use TypeScript with proper types
- ✅ Test builds with `pnpm build` before pushing
- ✅ Use `"use client"` directive for interactive components
- ✅ Use path aliases (`@/components`, `@/lib`, etc.)
- ✅ Follow React Hook Form + Zod pattern for forms
- ✅ Use semantic HTML and ARIA labels
- ✅ Make components responsive with Tailwind breakpoints
- ✅ Use `cn()` utility for conditional class names

### DON'T:
- ❌ Create new UI primitives (use existing shadcn/ui components)
- ❌ Push directly to `main` branch
- ❌ Use English for UI content (Polish only)
- ❌ Use inline styles or CSS files (use Tailwind)
- ❌ Add server-side data fetching (this is a static site)
- ❌ Install heavy dependencies without discussion
- ❌ Skip TypeScript types (use `any` sparingly)
- ❌ Modify build configuration without understanding impact
- ❌ Create new color variables (use existing CSS variables)
- ❌ Use relative imports when path aliases are available

### Best Practices:
1. **Before adding a new component:** Check if a shadcn/ui component exists
2. **Before creating new styles:** Check if Tailwind utilities can achieve it
3. **Before adding a dependency:** Check if existing tools can solve the problem
4. **Always verify builds:** Run `pnpm build` before pushing
5. **Keep it simple:** This is a marketing site, not a complex web app
6. **Maintain consistency:** Follow patterns from existing components

## Project Statistics

- **Total UI Components:** 57 (shadcn/ui)
- **Custom Components:** 3 (ChatbotModal, ContactForm, ServiceCards)
- **Hooks:** 2 (use-toast, use-mobile)
- **Pages:** 1 (home page)
- **Deployment:** Automated via GitHub Actions
- **Build Time:** ~1-2 minutes
- **Bundle Size:** Optimized for static export

## Changelog

### 2025-01-17 - Initial CLAUDE.md Creation
- Created comprehensive guide for AI assistants
- Documented all tech stack, patterns, and conventions
- Added troubleshooting section and common tasks

---

**Last Updated:** 2025-01-17
**Repository:** github.com/mpzielinski/toskomplikowane
**Maintained by:** AI Assistant (Claude)
