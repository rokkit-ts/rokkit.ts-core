# [Rokkit.ts Core](https://rokkit.dev)

![GitHub](https://img.shields.io/github/license/rokkit-ts/rokkit.ts-core)
![npm (scoped)](https://img.shields.io/npm/v/@rokkit.ts/core)
[![Build Status](https://travis-ci.com/rokkit-ts/rokkit.ts-core.svg?branch=master)](https://travis-ci.com/rokkit-ts/rokkit.ts-core)

Rokkit.ts a microservice framework build in TypeScript for Node.js.
It focuses on a modular component system, developer exerience and good designed APIs to build any application without making restrictions.  
Rokkit.ts tries to be adaptable for all needs.
If you want to know more about the framework check out our [Website](https://rokkit.dev/).  
The Framework is still in an early phase but allready provides functionality to build basic applications.

This is the core module of the Rokkit.ts Framwork, it enable the dependency injection for user components and handles other found Rokkit.ts modules on the project. The core module is just the entry point into the Rokkit.ts environment.

## Install

Install rokkit.ts as an npm package:

```bash
npm install @rokkit.ts/core
```

### Rokkit-CLI

Create your first Rokkit.ts project with the rookit-cli. The cli helps you to bootstrap your project and create a lightweight template to start the development.

```bash
npx -p @rokkit.ts/core rokkit-cli init -n <your-project-name>
```

You can easily build your app using the rokkit-cli. it automates all needed steps and you can just run the app afterwards.

```bash
# Projects created with rokkit-cli
npm run build

# Projects created manually
npx rokkit-cli build
```

Run your app in development or production mode with the cli.

```bash
# Development mode
npm run start-dev # Projects created with rokkit-cli
npx rokkit-cli start

# Production mode
npm start # Projects created with rokkit-cli
npx rokkit-cli start -p
```

### [Getting Started](https://rokkit.dev/#getting-started)

In order to start your first project check out the [Getting Started](https://rokkit.dev/#getting-started) section on our website and try out our cli to create your first project. For a detailed example have a look at our [sample application repository](https://github.com/rokkit-ts/sample-application).

## API

The core module expose only two major functionalities by now:

- The entrypoint to start the framework
- Dependency Injection utilities
  Both will be explained in the following.

### The Entrypoint

The entrypoint tells the framework to start. It is a simple decorator that needs to be annotated on a class. In order to work properly the decorator needs the path to your root source code folder. Rokkit.ts will scan this and all sub directories for components that are important for you and the framework.
If there other modules of Rokkit.ts installed in your project there core will recognize and start them accordingly. Furthermore the core will also grant them access to information about user components.
Your Entrypoint class should lokk like the following code block:

```TypeScript
import { RokkitRunner } from  "@rokkit.ts/core"

@RokkitRunner("./src")
export class SampleApplication {
}
```

### Dependency Injection Utilities

In order to use or apply dependency injection the core module provides further annotations.
Currently there are three different decorator you could use. Let's have a look a the example below to understand the usage.

```TypeScript
import { Component, Service, Inject } from  "@rokkit.ts/core"

export class SimpleClass{

}

@Component()
export class SampleComponent{
}

@Service()
export class SampleService {
  constructor(sampleComponent: SampleComponent,
              @Inject(new SimpleClass()) simpleClass: SimpleClass)
}
```

The example shows the different usecase of the dependency injection decorators. First lets start with the `SimpleClass`, this class is not marked with any decorator and therefore not recognized by the dependency injection of Rokkit.ts.  
Rokkit.ts core module will only search for classes with the decorators `@Component` or `@Service`. Each class annotated with one of these is able to be automatically injected into another class because Rokkit.ts will create an injection definition and a related instance on start up.
As you can see at the `SampleService` the constructor contains two parameters. The first one is an object of the `SampleComponent`, this object will be injected at start up.  
You do not need to provide more information at this point the core module is able to determine that this object is an injectable component. The second parameter is an object with the type `SimpleClass`, because the class is not annotated the core does not know how to inject the object (create an instance of it).  
But we can tell the framework to how to do this by using `@Inject`. This decorator will injection the provided value to the exact parameter we you used it.

## Contribution

If you want to contribute to the project, please don't hesitate to send feedback, create issues or pull requests for open ones.

## License

Rokkit.ts Core is Open Source software released under the [MIT license](./LICENSE).
