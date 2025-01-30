import React, { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import Page from "../components/Page";
import "./nanoid.scss";
import Bottle from "../components/Bottle/Bottle";

export default function BottlePage() {
  return (
    <Page seo={{ title: "Bottle | Malte Janßen" }}>
      <Bottle />
    </Page>
  );
}
