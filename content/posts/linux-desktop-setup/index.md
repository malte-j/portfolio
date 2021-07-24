---
  title: Making a Linux Desktop Actually Look Nice
  path: "/blog/linux-desktop-setup"
  date: "2021-07-09"
  unreleased: true
---

Add Terminator Padding:

```css
VteTerminal,
TerminalScreen,
vte-terminal {
    padding: 10px 10px 10px 10px;
    -VteTerminal-inner-border: 10px 10px 10px 10px;
}
```