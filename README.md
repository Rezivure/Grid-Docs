# Grid Documentation

This repository contains the official documentation for Grid, a privacy-first location sharing app. The documentation is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18 or above
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Rezivure/Grid-Docs.git
cd Grid-Docs

# Install dependencies
npm install
```

### Local Development

```bash
# Start the development server
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
# Build the static files
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

### Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Project Structure

```
Grid-Docs/
├── docs/                    # Documentation markdown files
│   ├── intro.md            # Introduction page
│   └── ...                 # Other documentation files
├── src/
│   ├── components/         # React components
│   ├── css/               # CSS files
│   └── pages/             # Custom pages
├── static/                # Static files like images
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.ts           # Sidebar configuration
└── package.json
```

## Contributing

We welcome contributions to improve the documentation! Please read our [Contributing Guidelines](docs/contributing.md) before submitting changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a new Pull Request

## Documentation Standards

- Use clear, concise language
- Include code examples where applicable
- Keep privacy and security in mind
- Update the sidebar when adding new pages
- Test all code examples
- Include screenshots for UI-related documentation

## License

This documentation is licensed under AGPL-3.0. See the [LICENSE](LICENSE) file for details.

## Support

If you need help with the documentation:
- Join our [Matrix chat](https://matrix.to/#/#grid:matrix.org)
- Visit our [website](https://mygrid.app)