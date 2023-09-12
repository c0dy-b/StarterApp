import React from "react";

export type EntriesResponseData = {
  id: number;
  title: string;
  description: string;
  date: Date;
  lastUpdatedDate: Date;
  references: ReferenceData[];
};

type ReferenceData = {
  id: number;
  referencedId: number;
};

export type ResponseData = {
  data: [] | EntriesResponseData;
  errors: [];
  hasErrors: boolean;
};
