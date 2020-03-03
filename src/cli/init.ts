import { ChildProcess, spawn } from "child_process";
import * as fs from "fs-extra";

const onExit = (childProcess: ChildProcess): Promise<void> => {
  return new Promise((resolve, reject) => {
    childProcess.once("exit", (code: number, signal: string) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error("Exit with error code: " + code));
      }
    });
    childProcess.once("error", (err: Error) => {
      reject(err);
    });
  });
};

const execFromDir = async (projectName: string, command: string) => {
  const child = spawn("bash");
  child.stdout.on("data", data => console.log(data.toString()));
  child.stderr.on("data", data => console.error(data.toString()));
  child.stdin.end(`(cd ${projectName} && ${command})`);
  await onExit(child);
};

const installDependencies = async (projectName: string) => {
  console.log("Installing dependencies:");
  console.log("@rokkit.ts core");
  await execFromDir(projectName, `npm i --save @rokkit.ts/core`);
  console.log("@rokkit.ts web");
  await execFromDir(projectName, `npm i --save @rokkit.ts/web`);
  console.log("typeScript");
  await execFromDir(projectName, `npm i --save-dev typescript`);
  console.log("ts-node");
  await execFromDir(projectName, `npm i --save-dev ts-node`);
};

const updatePackageJson = async (projectName: string) => {
  console.log("Updating package.json");
  const filePath = `${projectName}/package.json`;
  const packageJson = JSON.parse(
    fs.readFileSync(filePath, { encoding: "utf8" })
  );

  packageJson.version = "0.1.0";
  packageJson.main = "build/app.js";
  packageJson.description = "Rokkit.ts app created by rokkit.ts-cli";
  packageJson.repository = "enter repository here";
  packageJson.scripts = {
    build: "rokkit-cli build",
    "run-dev": "rokkit-cli run",
    test: 'echo "Error: no test specified" && exit 1'
  };

  fs.writeFileSync(filePath, JSON.stringify(packageJson));
};

const copyProjectFiles = (projectName: string) => {
  console.log("Copy needed files to project dir");
  fs.copySync(`${__dirname}/../../template/`, `./${projectName}/`);
};

export const init = async (projectName: string) => {
  console.log(
    `Creating a new rokkit.ts project for the name --> ${projectName}`
  );
  fs.mkdirSync(`${projectName}`);
  await execFromDir(projectName, `npm init -y`);
  await updatePackageJson(projectName);
  await installDependencies(projectName);
  copyProjectFiles(projectName);

  console.log("Completed all actions!");
};
