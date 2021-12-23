---
  title: React Portals with TypeScript
  path: "/blog/react-typescript-portals"
  date: "2021-04-27"
---

I couldn't find any good documentation on using React Portals with correct TypeScript typings and wanted to make this Post for everyone struggeling with the same issues.

To put something somewhere using a portal, you first need to create a component that returns a Portal.
In this example I pass an already existing DOM Node to the component, that's why typing can be a bit of a hassle.

A simple example for a sidebar: 
```tsx
  import React from "react"
  import ReactDOM from "react-dom";

  // declare an interface props
  interface SidebarProps {
    container: HTMLElement,
    text: string
  }

  export const Sidebar(props: Props) {
    return ReactDOM.createPortal(
      (
        <div>
          <p>some jsx, etc.</p>
          <p>{props.text}</p>  
        </div>
      ),
      props.container
    )
  }

```

Using the Portal:

```tsx
  import React from "react"

  export const App = () => {
    return (<div>
      <p>Do some app stuff...</p>

      <Sidebar
        container={document.getElementById('someEl') as HTMLElement}
        text="hello!"
      />
    </div>)
  }
```

What is important here is the typecast using `HTMLElement`. We need to typecast here, otherwise `ReactDOM.createPortal` will reject the element.