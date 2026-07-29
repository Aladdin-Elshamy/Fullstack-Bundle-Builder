# React Bundler - Security System Bundle Builder

A fullstack take-home prototype for building a personalized home security bundle. The app provides a two-column shopping experience: a multi-step bundle builder on the left and a live review/checkout summary on the right.

Shoppers can choose cameras, select a monitoring plan, add sensors, add extra protection, review their configured system, adjust quantities from either side of the UI, and save their configuration for later. The application is responsive across screen sizes and uses React Query caching for fetched product data.

## Features

### Multi-step bundle builder

- Four-step vertical accordion flow:
  1. Choose your cameras
  2. Choose your plan
  3. Choose your sensors
  4. Add extra protection
- Step 1 opens by default.
- Accordion steps can expand and collapse.
- Each step displays:
  - Step number label
  - Icon
  - Step title
  - Open/collapsed chevron indicator
  - Dynamic selected-product count
- Each expanded step includes a `Next: ...` button to move to the next section.

### Product cards

Each product card supports the UI elements needed by the design:

- Optional discount badge
- Product image
- Product title
- Short description
- `Learn More` link
- Optional color/variant selector
- Quantity stepper
- Compare-at price with strike through
- Active sale price
- Selected-card visual state when quantity is greater than zero

Products can have different shapes:
- Some include discounts.
- Some include variants.
- Some have no variant selector.
- Plans use a choose/selected button instead of a quantity stepper.

### Variant-specific quantities

Variant selection is fully quantity-aware.

For products with color or variant options:

- Each variant has its own independent quantity.
- The product card quantity stepper is bound to the currently active variant.
- Changing the active variant updates the stepper to that variant's quantity.
- Quantities for other variants remain saved.
- The review panel shows each selected variant as a separate line item.

Example:

- Add `2` White cameras.
- Switch to Black.
- The stepper shows `0`.
- Add `1` Black camera.
- The review panel shows:
  - White camera x2
  - Black camera x1

### Synced quantity controls

Quantity steppers are available in both places:

- Product cards in the builder
- Line items in the review panel

They stay in sync through shared state. Updating a quantity in the builder immediately updates the review panel, and updating a quantity in the review panel updates the corresponding product card.

### Live review panel

The review panel updates as the shopper configures their system.

It includes grouped line items under:

- Cameras
- Sensors
- Accessories
- Plan

Each selected line displays:

- Thumbnail or icon
- Product name
- Variant name when applicable
- Quantity stepper where applicable
- Compare-at price when applicable
- Active line price

### Required Sense Hub behavior

The `sense-hub` sensor product is handled as a required dependency:

- It is automatically added to the review panel when sensors are selected.
- It appears in the Sensors section with a `(Required)` label.
- It is not displayed as a selectable product in the bundle builder.
- It is treated as required and cannot be removed from the review panel while needed.

### Checkout summary

The checkout area includes:

- Shipping/review support section
- Satisfaction-guarantee badge
- Financing badge
- Dynamic total
- Compare-at total with strikethrough when savings exist
- Savings callout
- Checkout button
- `Save my system for later` action

Pricing behavior includes:

- Hardware products contribute to the one-time total.
- Plans contribute to the monthly total.
- The financing badge includes hardware financing plus the selected discounted plan price.
- The savings callout includes both hardware discounts and plan discounts.

### Save system for later

The `Save my system for later` button persists the shopper's configuration client-side.

- Uses `localStorage`.
- Saves selected products, quantities, and variant-specific quantities.
- Restores the system after page reload or a later return visit.
- Keeps the builder and review panel in the same state the shopper left them.

### Responsive experience

The UI is built as a responsive two-column experience:

- On larger screens, the builder and review panel sit beside each other.
- On smaller screens, the layout adapts for mobile-friendly browsing.
- Product grids, cards, accordion sections, and checkout content adjust across breakpoints.

### Data caching

The app uses React Query to manage and cache fetched product data, improving repeated data access and keeping server state handling organized.

### Accessibility improvements

The app includes accessibility-focused improvements:

- Meta description in `index.html`
- Descriptive page title
- Product image `alt` text
- Variant option image `alt` text
- Accessible names for variant option buttons
- Accessible names for quantity increase/decrease buttons in both the builder and review panel
- Disabled quantity controls include helpful tooltip messaging


## Tech stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Base UI / shared UI components
- Zustand for bundle state
- React Query
- localStorage persistence

### Backend

- Node.js
- Express
- Mongoose
- Nodemon for development

## Project structure

```txt
.
├── backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   └── routes/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── features/
│       │   ├── builder/
│       │   └── review/
│       ├── shared/
│       └── store/
├── package.json
└── README.md
```

## Run instructions

This project has root-level backend dependencies and frontend dependencies.

### 1. Start the backend from the root folder

From the root folder:

```bash
npm i
npm run dev
```

This starts the backend development server using Nodemon.

### 2. Start the frontend

Open a second terminal, then run:

```bash
cd frontend
npm i
npm run dev
```

This starts the Vite frontend development server.

After the frontend starts, open the local URL shown in the terminal, usually:

```txt
http://localhost:5173
```

## Build instructions

To build the frontend directly:

```bash
cd frontend
npm run build
```

To run the root build script:

```bash
npm run build
```

The root build script installs root dependencies, installs frontend dependencies, and builds the frontend.

## Preview production frontend build

From the frontend folder:

```bash
cd frontend
npm run build
npm run preview
```

Then open the preview URL shown in the terminal, usually:

```txt
http://localhost:4173
```

Use this production preview URL when checking Lighthouse or performance results instead of the Vite dev server.

## How to use the app

1. Open the frontend app in the browser.
2. Start with the Cameras step.
3. Add products using the quantity steppers.
4. For products with variants, choose a color/variant and set a quantity for that variant.
5. Continue through Plan, Sensors, and Extra Protection.
6. Review the selected system in the right-hand panel.
7. Adjust quantities from either the builder or review panel.
8. Click `Save my system for later`.
9. Reload the page to confirm the saved system is restored.

## Notes

- Variant quantities are tracked separately, so each selected variant appears as its own review line.
- Required products, such as the Sense Hub, are automatically managed by the app.
- Plans are treated as monthly pricing, while hardware is treated as one-time pricing.
- The checkout financing line combines one-time hardware financing with selected monthly plan pricing.