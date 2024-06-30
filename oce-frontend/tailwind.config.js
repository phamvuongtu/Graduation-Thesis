/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "base-black": "var(--base-base-black)",
        "base-white": "var(--base-base-white)",
        "error-error": "var(--error-error)",
        "error-error100": "var(--error-error100)",
        "error-error1000": "var(--error-error1000)",
        "error-error200": "var(--error-error200)",
        "error-error300": "var(--error-error300)",
        "error-error400": "var(--error-error400)",
        "error-error500": "var(--error-error500)",
        "error-error600": "var(--error-error600)",
        "error-error700": "var(--error-error700)",
        "error-error800": "var(--error-error800)",
        "error-error900": "var(--error-error900)",
        "info-info": "var(--info-info)",
        "info-info100": "var(--info-info100)",
        "info-info1000": "var(--info-info1000)",
        "info-info200": "var(--info-info200)",
        "info-info300": "var(--info-info300)",
        "info-info400": "var(--info-info400)",
        "info-info500": "var(--info-info500)",
        "info-info600": "var(--info-info600)",
        "info-info700": "var(--info-info700)",
        "info-info800": "var(--info-info800)",
        "info-info900": "var(--info-info900)",
        "neutrals-base-black": "var(--neutrals-base-black)",
        "neutrals-base-white": "var(--neutrals-base-white)",
        "neutrals-neutrals100": "var(--neutrals-neutrals100)",
        "neutrals-neutrals1000": "var(--neutrals-neutrals1000)",
        "neutrals-neutrals200": "var(--neutrals-neutrals200)",
        "neutrals-neutrals300": "var(--neutrals-neutrals300)",
        "neutrals-neutrals400": "var(--neutrals-neutrals400)",
        "neutrals-neutrals500": "var(--neutrals-neutrals500)",
        "neutrals-neutrals600": "var(--neutrals-neutrals600)",
        "neutrals-neutrals700": "var(--neutrals-neutrals700)",
        "neutrals-neutrals800": "var(--neutrals-neutrals800)",
        "neutrals-neutrals900": "var(--neutrals-neutrals900)",
        "primary-primary": "var(--primary-primary)",
        "primary-primary100": "var(--primary-primary100)",
        "primary-primary1000": "var(--primary-primary1000)",
        "primary-primary200": "var(--primary-primary200)",
        "primary-primary300": "var(--primary-primary300)",
        "primary-primary400": "var(--primary-primary400)",
        "primary-primary500": "var(--primary-primary500)",
        "primary-primary600": "var(--primary-primary600)",
        "primary-primary700": "var(--primary-primary700)",
        "primary-primary800": "var(--primary-primary800)",
        "primary-primary900": "var(--primary-primary900)",
        "secondary-secondary": "var(--secondary-secondary)",
        "secondary-secondary100": "var(--secondary-secondary100)",
        "secondary-secondary1000": "var(--secondary-secondary1000)",
        "secondary-secondary200": "var(--secondary-secondary200)",
        "secondary-secondary300": "var(--secondary-secondary300)",
        "secondary-secondary400": "var(--secondary-secondary400)",
        "secondary-secondary500": "var(--secondary-secondary500)",
        "secondary-secondary600": "var(--secondary-secondary600)",
        "secondary-secondary700": "var(--secondary-secondary700)",
        "secondary-secondary800": "var(--secondary-secondary800)",
        "secondary-secondary900": "var(--secondary-secondary900)",
        "success-success": "var(--success-success)",
        "success-success100": "var(--success-success100)",
        "success-success1000": "var(--success-success1000)",
        "success-success200": "var(--success-success200)",
        "success-success300": "var(--success-success300)",
        "success-success400": "var(--success-success400)",
        "success-success500": "var(--success-success500)",
        "success-success600": "var(--success-success600)",
        "success-success700": "var(--success-success700)",
        "success-success800": "var(--success-success800)",
        "success-success900": "var(--success-success900)",
        "warning-warning": "var(--warning-warning)",
        "warning-warning100": "var(--warning-warning100)",
        "warning-warning1000": "var(--warning-warning1000)",
        "warning-warning200": "var(--warning-warning200)",
        "warning-warning300": "var(--warning-warning300)",
        "warning-warning400": "var(--warning-warning400)",
        "warning-warning500": "var(--warning-warning500)",
        "warning-warning600": "var(--warning-warning600)",
        "warning-warning700": "var(--warning-warning700)",
        "warning-warning800": "var(--warning-warning800)",
        "warning-warning900": "var(--warning-warning900)",
      },
      fontFamily: {
        "base-bold": "var(--base-bold-font-family)",
        "base-regular": "var(--base-regular-font-family)",
        "h1-bold": "var(--h1-bold-font-family)",
        "h1-regular": "var(--h1-regular-font-family)",
        "h2-bold": "var(--h2-bold-font-family)",
        "h2-regular": "var(--h2-regular-font-family)",
        "desktop-body-caption-accent":
          "var(--desktop-body-caption-accent-font-family)",
        "desktop-body-caption-bold":
          "var(--desktop-body-caption-bold-font-family)",
        "desktop-body-caption-emphasis":
          "var(--desktop-body-caption-emphasis-font-family)",
        "desktop-body-caption-regular":
          "var(--desktop-body-caption-regular-font-family)",
        "desktop-body-content-accent":
          "var(--desktop-body-content-accent-font-family)",
        "desktop-body-content-bold":
          "var(--desktop-body-content-bold-font-family)",
        "desktop-body-content-emphasis":
          "var(--desktop-body-content-emphasis-font-family)",
        "desktop-body-content-regular":
          "var(--desktop-body-content-regular-font-family)",
        "desktop-body-feature-accent":
          "var(--desktop-body-feature-accent-font-family)",
        "desktop-body-feature-bold":
          "var(--desktop-body-feature-bold-font-family)",
        "desktop-body-feature-emphasis":
          "var(--desktop-body-feature-emphasis-font-family)",
        "desktop-body-feature-standard":
          "var(--desktop-body-feature-standard-font-family)",
        "desktop-body-hero-accent":
          "var(--desktop-body-hero-accent-font-family)",
        "desktop-body-hero-bold": "var(--desktop-body-hero-bold-font-family)",
        "desktop-body-hero-emphasis":
          "var(--desktop-body-hero-emphasis-font-family)",
        "desktop-body-hero-standard":
          "var(--desktop-body-hero-standard-font-family)",
        "desktop-body-highlight-accent":
          "var(--desktop-body-highlight-accent-font-family)",
        "desktop-body-highlight-bold":
          "var(--desktop-body-highlight-bold-font-family)",
        "desktop-body-highlight-emphasis":
          "var(--desktop-body-highlight-emphasis-font-family)",
        "desktop-body-highlight-standard":
          "var(--desktop-body-highlight-standard-font-family)",
        "desktop-headings-display-1":
          "var(--desktop-headings-display-1-font-family)",
        "desktop-headings-display-2":
          "var(--desktop-headings-display-2-font-family)",
        "desktop-headings-display-3":
          "var(--desktop-headings-display-3-font-family)",
        "desktop-headings-heading-1":
          "var(--desktop-headings-heading-1-font-family)",
        "desktop-headings-heading-2":
          "var(--desktop-headings-heading-2-font-family)",
        "desktop-headings-heading-3":
          "var(--desktop-headings-heading-3-font-family)",
        "desktop-headings-heading-4":
          "var(--desktop-headings-heading-4-font-family)",
        "mobile-body-caption-accent":
          "var(--mobile-body-caption-accent-font-family)",
        "mobile-body-caption-emphasis":
          "var(--mobile-body-caption-emphasis-font-family)",
        "mobile-body-caption-regular":
          "var(--mobile-body-caption-regular-font-family)",
        "mobile-body-content-accent":
          "var(--mobile-body-content-accent-font-family)",
        "mobile-body-content-bold":
          "var(--mobile-body-content-bold-font-family)",
        "mobile-body-content-emphasis":
          "var(--mobile-body-content-emphasis-font-family)",
        "mobile-body-content-regular":
          "var(--mobile-body-content-regular-font-family)",
        "mobile-body-feature-accent":
          "var(--mobile-body-feature-accent-font-family)",
        "mobile-body-feature-bold":
          "var(--mobile-body-feature-bold-font-family)",
        "mobile-body-feature-emphasis":
          "var(--mobile-body-feature-emphasis-font-family)",
        "mobile-body-feature-standard":
          "var(--mobile-body-feature-standard-font-family)",
        "mobile-body-footnote-accent":
          "var(--mobile-body-footnote-accent-font-family)",
        "mobile-body-footnote-emphasis":
          "var(--mobile-body-footnote-emphasis-font-family)",
        "mobile-body-footnote-regular":
          "var(--mobile-body-footnote-regular-font-family)",
        "mobile-body-highlight-accent":
          "var(--mobile-body-highlight-accent-font-family)",
        "mobile-body-highlight-bold":
          "var(--mobile-body-highlight-bold-font-family)",
        "mobile-body-highlight-emphasis":
          "var(--mobile-body-highlight-emphasis-font-family)",
        "mobile-body-highlight-standard":
          "var(--mobile-body-highlight-standard-font-family)",
        "mobile-headings-display-1":
          "var(--mobile-headings-display-1-font-family)",
        "mobile-headings-display-2":
          "var(--mobile-headings-display-2-font-family)",
        "mobile-headings-display-3":
          "var(--mobile-headings-display-3-font-family)",
        "mobile-headings-heading-1":
          "var(--mobile-headings-heading-1-font-family)",
        "mobile-headings-heading-2":
          "var(--mobile-headings-heading-2-font-family)",
        "mobile-headings-heading-3":
          "var(--mobile-headings-heading-3-font-family)",
        "mobile-headings-heading-4":
          "var(--mobile-headings-heading-4-font-family)",
        "script-bold": "var(--script-bold-font-family)",
        "script-regular": "var(--script-regular-font-family)",
        "sub-script-bold": "var(--sub-script-bold-font-family)",
        "sub-script-regular": "var(--sub-script-regular-font-family)",
      },
      boxShadow: {
        "shadow": "var(--shadow)",
      },
    },
  },
  plugins: [],
};