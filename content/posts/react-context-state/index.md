---
title: Using React Context for managing global State
path: "/blog/react-context-state"
date: "2022-07-26"
thumbnail: "./thumbnail.jpg"
---

import CodeGenerator from './CodeGenerator';

There are seemingly infinite ways to manage state in React. You can embrace the boilerplate and use [redux](https://redux.js.org/), you can use one of the newer and maybe simpler libraries, like [jotai](https://jotai.org/) or [zustand](https://github.com/pmndrs/zustand) and probably be fine.

But sometimes, you just want to store simple values that you can access globally using a Hook. Or maybe you just don't want to add another library to your 300MB bundle. Whichever it is, by using [React Context](https://reactjs.org/docs/context.html) with TypeScript, you can create a pretty simple way of managing your global state.

I've included a simple example showing you how to use the context API for storing the current theme, accessible from anywhere.

You can also enter your own context name, e.g. Auth, Connection, Locale, etc. and it will generate the boilerplate code for you.

<CodeGenerator/>
