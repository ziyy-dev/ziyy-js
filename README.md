# Ziyy - Rust based terminal styler.

Ziyy is a terminal styler that uses HTML-like tags

For information on using Ziyy, see the [Ziyy website](https://ziyy-dev.github.io).

## Building

To build the project, ensure you have the following prerequisites installed:

1. **Rust**: Install Rust from [rustup.rs](https://rustup.rs).
2. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org).
3. **Napi-rs CLI**: Install the Napi-rs CLI globally using npm:
   ```bash
   yarn global add @napi-rs/cli
   ```

Once the prerequisites are installed, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ziyy-dev/ziyy-js.git
   cd ziyy-js
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Build the project:
   ```bash
   napi build --release
   ```

This will generate the native bindings and compile the project.
