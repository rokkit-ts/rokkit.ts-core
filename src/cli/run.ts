import { execute } from "./utils";

// tslint:disable: no-console
export const run = async (production: boolean, rootClass?: string) => {
  console.log("Starting the application");
  if (production) {
    await execute(`NODE_ENV=production node ${rootClass || "./build/app.js"}`);
  } else {
    await execute(`ts-node ${rootClass || "./src/app.ts"}`);
  }
};
