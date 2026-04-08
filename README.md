# bun v1.2.17

# file and folder name style: kebab-case

# use tailwind-clamp for responsive size (ex, className="clamp-[text,sm,xl]")

# Add setLocale to all relevant layouts and pages for fast load, better SEO, avoid translation flicker

# use next-intl navigation(src/i18n/navigation) instead of next.js navigation

# use get-href function with navigation (ex, <Link href={getHref({ pathname: "/" })}>Home</Link>)

# use ClientImage and ServerImage components with remote images

# use ClientTranslate and ServerTranslate components with translations to avoid boilerplate

# write parse need translation keys in root json object: ex, in en.json: write like this: {description: "<p>description</p>"}; don't write like this: {home: {description: "<p>description</p>"}}

# use rem for font-size and spacing(margin/padding); use px for border, box shadow; for width/height: rem or px (depending on the situation); use tailwindcss sizes as much as possible, ex: use mb-3 instead of mb-[12px], use text-sm instead of text-[14px];
