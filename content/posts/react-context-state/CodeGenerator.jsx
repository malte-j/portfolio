import { ResetIcon } from "@radix-ui/react-icons";
import React from "react";
import * as style from "./CodeGenerator.module.scss";

export default function CodeGenerator() {
  const [contextName, setContextName] = React.useState("Theme");
  const [wasEdited, setWasEdited] = React.useState(false);

  return (
    <>
      <label>
        your context name
        <div className={style.input}>
          <input
            type="text"
            value={contextName}
            placeholder="eg. Auth, Theme, etc."
            onChange={(e) => {
              setContextName(capitalizeFirstLetter(e.target.value));
              setWasEdited(true);
            }}
          />
          {wasEdited && (
            <button
              onClick={() => {
                setWasEdited(false);
                setContextName("Theme");
              }}
              className={style.button}
            >
              <ResetIcon /> Reset
            </button>
          )}
        </div>
      </label>
      <br />
      {/* -------------------------------------- */}

        <div className="gatsby-highlight" data-language="tsx">
          <pre className="language-tsx">
            <code className="language-tsx">
              <span className="token keyword">import</span> React
              <span className="token punctuation">,</span>{" "}
              <span className="token punctuation">{"{"}</span> createContext
              <span className="token punctuation">,</span> useContext
              <span className="token punctuation">,</span> useEffect
              <span className="token punctuation">,</span> useState{" "}
              <span className="token punctuation">{"}"}</span>{" "}
              <span className="token keyword">from</span>{" "}
              <span className="token string">"react"</span>
              <span className="token punctuation">;</span>
              {"\n"}
              {"\n"}
              <span className="token keyword">interface</span>{" "}
              <span className="token class-name">{contextName}Data</span>{" "}
              <span className="token punctuation">{"{"}</span>
              {!wasEdited && (
                <>
                  {"\n"}
                  {"  "}isDarkmode<span className="token operator">:</span>{" "}
                  <span className="token builtin">boolean</span>
                  <span className="token punctuation">;</span>
                  {"\n"}
                  {"  "}
                  <span className="token function">setIsDarkmode</span>
                  <span className="token punctuation">(</span>isDarkmode
                  <span className="token operator">:</span>{" "}
                  <span className="token builtin">boolean</span>
                  <span className="token punctuation">)</span>
                  <span className="token operator">:</span>{" "}
                  <span className="token keyword">void</span>
                  <span className="token punctuation">;</span>
                  {"\n"}
                </>
              )}
              <span className="token punctuation">{"}"}</span>
              {"\n"}
              {"\n"}
              <span className="token comment">// @ts-ignore</span>
              {"\n"}
              <span className="token keyword">const</span> {contextName}Context{" "}
              <span className="token operator">=</span>{" "}
              <span className="token generic-function">
                <span className="token function">createContext</span>
                <span className="token generic class-name">
                  <span className="token operator">&lt;</span>
                  {contextName}Data
                  <span className="token operator">&gt;</span>
                </span>
              </span>
              <span className="token punctuation">(</span>
              <span className="token punctuation">)</span>
              <span className="token punctuation">;</span>
              {"\n"}
              {"\n"}
              <span className="token keyword">export</span>{" "}
              <span className="token keyword">function</span>{" "}
              <span className="token function">{contextName}Provider</span>
              <span className="token punctuation">(</span>
              <span className="token punctuation">{"{"}</span>
              {"\n"}
              {"  "}children<span className="token punctuation">,</span>
              {"\n"}
              <span className="token punctuation">{"}"}</span>
              <span className="token operator">:</span>{" "}
              <span className="token punctuation">{"{"}</span>
              {"\n"}
              {"  "}children<span className="token operator">:</span> React
              <span className="token punctuation">.</span>ReactNode
              <span className="token punctuation">[</span>
              <span className="token punctuation">]</span>{" "}
              <span className="token operator">|</span> React
              <span className="token punctuation">.</span>ReactNode
              <span className="token punctuation">;</span>
              {"\n"}
              <span className="token punctuation">{"}"}</span>
              <span className="token punctuation">)</span>{" "}
              <span className="token punctuation">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="token keyword">const</span> value{" "}
              <span className="token operator">=</span>{" "}
              <span className="token function">use{contextName}Data</span>
              <span className="token punctuation">(</span>
              <span className="token punctuation">)</span>
              <span className="token punctuation">;</span>
              {"\n"}
              {"  "}
              <span className="token keyword">return</span>{" "}
              <span className="token operator">&lt;</span>
              {contextName}Context
              <span className="token punctuation">.</span>Provider value
              <span className="token operator">=</span>
              <span className="token punctuation">{"{"}</span>value
              <span className="token punctuation">{"}"}</span>
              <span className="token operator">&gt;</span>
              {"\n    "}
              <span className="token punctuation">{"{"}</span>children
              <span className="token punctuation">{"}"}</span>
              {"\n  "}
              <span className="token operator">&lt;</span>
              <span className="token operator">/</span>
              {contextName}Context
              <span className="token punctuation">.</span>Provider
              <span className="token operator">&gt;</span>
              <span className="token punctuation">;</span>
              {"\n"}
              <span className="token punctuation">{"}"}</span>
              {"\n"}
              {"\n"}
              <span className="token keyword">export</span>{" "}
              <span className="token keyword">const</span>{" "}
              <span className="token function-variable function">
                use{contextName}
              </span>{" "}
              <span className="token operator">=</span>{" "}
              <span className="token punctuation">(</span>
              <span className="token punctuation">)</span>{" "}
              <span className="token operator">=&gt;</span>{" "}
              <span className="token punctuation">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="token keyword">return</span>{" "}
              <span className="token function">useContext</span>
              <span className="token punctuation">(</span>
              {contextName}Context
              <span className="token punctuation">)</span>
              <span className="token punctuation">;</span>
              {"\n"}
              <span className="token punctuation">{"}"}</span>
              <span className="token punctuation">;</span>
              {"\n"}
              {"\n"}
              <span className="token keyword">function</span>{" "}
              <span className="token function">use{contextName}Data</span>
              <span className="token punctuation">(</span>
              <span className="token punctuation">)</span>
              <span className="token operator">:</span> {contextName}Data{" "}
              <span className="token punctuation">{"{"}</span>
              {"\n"}
              {!wasEdited && (
                <>
                  {"  "}
                  <span className="token keyword">const</span>{" "}
                  <span className="token punctuation">[</span>isDarkmode
                  <span className="token punctuation">,</span> setIsDarkmode
                  <span className="token punctuation">]</span>{" "}
                  <span className="token operator">=</span>{" "}
                  <span className="token function">useState</span>
                  <span className="token punctuation">(</span>
                  <span className="token boolean">false</span>
                  <span className="token punctuation">)</span>
                  <span className="token punctuation">;</span>
                  {"\n"}
                  {"\n"}
                </>
              )}
              {"  "}
              <span className="token keyword">return</span>{" "}
              <span className="token punctuation">{"{"}</span>
              {!wasEdited && (
                <>
                  {"\n"}
                  {"    "}isDarkmode<span className="token punctuation">,</span>
                  {"\n"}
                  {"    "}setIsDarkmode
                  <span className="token punctuation">,</span>
                  {"\n"}
                  {"  "}
                </>
              )}
              <span className="token punctuation">{"}"}</span>
              <span className="token punctuation">;</span>
              {"\n"}
              <span className="token punctuation">{"}"}</span>
            </code>
          </pre>
        </div>

      {/* ---------- */}

      <p>
        You need to wrap a component in the context before you can access it. If
        you want to access it in every component, place it above all else in
        your component hierarchy, e.g. in your <code>App.tsx</code>:
      </p>

      {/* ---------------- */}
      <div className="gatsby-highlight" data-language="tsx">
        <pre className="language-tsx">
          <code className="language-tsx">
            <span className="token keyword">import</span> React{" "}
            <span className="token keyword">from</span>{" "}
            <span className="token string">"react"</span>
            <span className="token punctuation">;</span>
            {"\n"}
            <span className="token keyword">import</span>{" "}
            {!wasEdited ? "Button" : "YourChildComponent"}{" "}
            <span className="token keyword">from</span>{" "}
            <span className="token string">
              "{!wasEdited ? "Button" : "YourChildComponent"}"
            </span>
            <span className="token punctuation">;</span>
            {"\n"}
            <span className="token keyword">import</span>{" "}
            <span className="token punctuation">{"{"}</span> {contextName}
            Provider <span className="token punctuation">{"}"}</span>{" "}
            <span className="token keyword">from</span>{" "}
            <span className="token string">"./{contextName}Provider"</span>
            <span className="token punctuation">;</span>
            {"\n"}
            {"\n"}
            <span className="token keyword">export</span>{" "}
            <span className="token keyword">default</span>{" "}
            <span className="token keyword">function</span>{" "}
            <span className="token function">App</span>
            <span className="token punctuation">(</span>
            <span className="token punctuation">)</span>{" "}
            <span className="token punctuation">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="token keyword">return</span>{" "}
            <span className="token punctuation">(</span>
            {"\n"}
            {"    "}
            <span className="token operator">&lt;</span>
            {contextName}Provider
            <span className="token operator">&gt;</span>
            {"\n"}
            {"      "}
            <span className="token tag">
              <span className="token tag">
                <span className="token punctuation">&lt;</span>
                <span className="token class-name">
                  {!wasEdited ? "Button" : "YourChildComponent"}
                </span>
              </span>{" "}
              <span className="token punctuation">/&gt;</span>
            </span>
            {"\n"}
            {"    "}
            <span className="token operator">&lt;</span>
            <span className="token operator">/</span>
            {contextName}Provider
            <span className="token operator">&gt;</span>
            {"\n"}
            {"  "}
            <span className="token punctuation">)</span>
            <span className="token punctuation">;</span>
            {"\n"}
            <span className="token punctuation">{"}"}</span>
          </code>
        </pre>
      </div>

      {/* ----------------------- */}

      <p>
        Then you can use it in any child component of <code>App.tsx</code>,
        e.g. a button:
      </p>

      {/* --------------------- */}

      <div className="gatsby-highlight" data-language="tsx">
        <pre className="language-tsx">
          <code className="language-tsx">
            <span className="token keyword">import</span> React{" "}
            <span className="token keyword">from</span>{" "}
            <span className="token string">"react"</span>
            <span className="token punctuation">;</span>
            {"\n"}
            <span className="token keyword">import</span>{" "}
            <span className="token punctuation">{"{"}</span> use{contextName}{" "}
            <span className="token punctuation">{"}"}</span>{" "}
            <span className="token keyword">from</span>{" "}
            <span className="token string">"./{contextName}Provider"</span>
            <span className="token punctuation">;</span>
            {"\n"}
            {"\n"}
            <span className="token keyword">export</span>{" "}
            <span className="token keyword">default</span>{" "}
            <span className="token keyword">function</span>{" "}
            <span className="token function">
              {!wasEdited ? "Button" : "YourChildComponent"}
            </span>
            <span className="token punctuation">(</span>
            <span className="token punctuation">)</span>{" "}
            <span className="token punctuation">{"{"}</span>
            {"\n"}
            {"  "}
            <span className="token keyword">const</span>{" "}
            <span className="token punctuation">{"{"}</span>
            {!wasEdited && <> isDarkMode </>}
            <span className="token punctuation">{"}"}</span>{" "}
            <span className="token operator">=</span>{" "}
            <span className="token function">use{contextName}</span>
            <span className="token punctuation">(</span>
            <span className="token punctuation">)</span>
            <span className="token punctuation">;</span>
            {"\n"}
            {"\n"}
            {"  "}
            <span className="token keyword">return</span>{" "}
            <span className="token tag">
              <span className="token tag">
                <span className="token punctuation">&lt;</span>
                {!wasEdited ? "button" : "div"}
              </span>
              {!wasEdited && (
                <>
                  {" "}
                  <span className="token attr-name">data-is-darkmode</span>
                  <span className="token script language-javascript">
                    <span className="token script-punctuation punctuation">
                      =
                    </span>
                    <span className="token punctuation">{"{"}</span>isDarkMode
                    <span className="token punctuation">{"}"}</span>
                  </span>
                </>
              )}
              <span className="token punctuation">&gt;</span>
            </span>
            <span className="token plain-text">Hello</span>
            <span className="token tag">
              <span className="token tag">
                <span className="token punctuation">&lt;/</span>
                {!wasEdited ? "button" : "div"}
              </span>
              <span className="token punctuation">&gt;</span>
            </span>
            <span className="token punctuation">;</span>
            {"\n"}
            <span className="token punctuation">{"}"}</span>
          </code>
        </pre>
      </div>
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
