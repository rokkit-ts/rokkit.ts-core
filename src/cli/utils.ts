// tslint:disable: no-console
import { ChildProcess, spawn } from "child_process";

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

export const execute = async (command: string) => {
  const child = spawn("bash");
  child.stdout.on("data", data => console.log(data.toString()));
  child.stderr.on("data", data => console.error(data.toString()));
  child.stdin.end(command);
  await onExit(child);
};

export const executeFromContext = async (projectDir: string, command: string) =>
  await execute(`(cd ${projectDir} && ${command})`);
