import React from "react";

// Thanks to https://www.joshwcomeau.com/react/dark-mode/
function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("theme");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
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
