#!/usr/bin/env node

const child_process = require("node:child_process");
const fs = require("node:fs");
const { join, resolve } = require("node:path");
const { exit } = require("node:process");

class Main {
  constructor() {
    this.args = process.argv.slice(2);
    this.__root = resolve(__dirname, "..");
    this.__deps = resolve(this.__root, "npm");
  }

  run() {
    switch (this.args[0]) {
      case "clean":
        this.clean();
        break;

      case "s":
      case "sync":
        this.sync();
        break;

      case "publish":
        this.publish();
        break;
      case "verify-artifacts":
        this.verifyArtifacts();
        break;

      default:
        console.error(`Unknown Command: ${this.args[0]}`);
        console.error("Available commands: clean, s, sync");
        exit(1);
    }
  }

  clean() {
    child_process.execSync("cargo clean", {
      stdio: "inherit",
      cwd: this.__root,
    });
  }

  sync() {
    const __packageJson = join(this.__root, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(__packageJson).toString());
    this.version = packageJson.version;
    this.description = packageJson.description;
    this.license = packageJson.license;
    this.author = packageJson.author;
    this.repository = packageJson.repository;
    this.bugs = packageJson.bugs;
    this.homepage = packageJson.homepage;
    this.engines = packageJson.engines;

    const deps = fs.readdirSync(this.__deps);
    for (const dir of deps) {
      const __target = join(this.__deps, dir);
      this.syncPackage(__target);
    }
  }

  /**
   *
   * @param {string} dir
   */
  syncPackage(dir) {
    const __packageJson = join(dir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(__packageJson).toString());
    packageJson.version = this.version;
    packageJson.description = this.description;
    packageJson.license = this.license;
    packageJson.author = this.author;
    packageJson.repository = this.repository;
    this.repository.directory = dir.replace(`${this.__root}/`, "");
    packageJson.bugs = this.bugs;
    packageJson.homepage = this.homepage;
    packageJson.engines = this.engines;

    fs.writeFileSync(
      __packageJson,
      `${JSON.stringify(packageJson, undefined, 2)}\n`
    );
  }

  publish() {
    const __packageJson = join(this.__root, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(__packageJson).toString());
    const deps = fs.readdirSync(this.__deps);
    this.optionalDependencies = {};
    for (const dir of deps) {
      const __target = join(this.__deps, dir);
      this.publishPackage(__target);
    }
    packageJson.optionalDependencies = this.optionalDependencies;
    fs.writeFileSync(
      __packageJson,
      `${JSON.stringify(packageJson, undefined, 2)}\n`
    );
  }
  publishPackage(dir) {
    const __packageJson = join(dir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(__packageJson).toString());
    if (packageJson.private) {
      console.log(`Skipping private package: ${packageJson.name}`);
      return;
    }
    console.log(`Publishing package: ${packageJson.name}`);
    child_process.execSync("yarn npm publish --tolerate-republish", {
      cwd: dir,
      stdio: "inherit",
    });
    // @ts-ignore
    this.optionalDependencies[packageJson.name] = packageJson.version;
  }

  verifyArtifacts() {
    const __artifacts = fs.readdirSync(join(this.__root, "artifacts"));
    if (__artifacts.length <= 0) {
      exit(1);
    }
  }
}

const main = new Main();
main.run();
