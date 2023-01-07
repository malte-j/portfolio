import React from "react";

// Thanks to https://www.joshwcomeau.com/react/dark-mode/
function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("theme");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

const MagicScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  ${getInitialColorMode.toString()}

  const colorMode = getInitialColorMode();
  const root = document.documentElement;

  document.body.dataset.theme = colorMode
})()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};
