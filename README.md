# Project Name README

Welcome to the README for our project! This project is built using Next.js with Jest for testing, TypeScript for type safety, and SCSS for styling.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a web application consisting of two main pages served by Next.js. The pages include a menu that redirects users to "exercise1" and "exercise2". Both exercises utilize a custom range component that allows users to select a range of money values. 

## Features

- Two main pages: "exercise1" and "exercise2"
- Custom range component allowing users to select a range of money values
- "exercise1" retrieves the minimum and maximum values for the range from an API or input by user
- "exercise2" allows users to select a range only within a predefined list of values from an API

## Project Structure

```
project-root/
│
├── components/
│   └── Range
│
├── pages/
│   ├── exercise1
│   ├── __tests__
│   ├── exercise2
│   └── __tests__
│
├── styles/
│   └── global.css
│
├── helpers/
│   ├── __test__
│   └── api-utils.ts
│
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/EduardoPereyra/CustomRangeComponent.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CustomRangeComponent
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Once the installation is complete, you can start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Testing

Testing is implemented using Jest. To run tests, use the following command:

```bash
npm run test
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This README provides a comprehensive overview of the project, including its features, structure, installation instructions, usage guidelines, testing procedures, contribution guidelines, and licensing information. You can customize it further based on your specific project requirements and conventions.
