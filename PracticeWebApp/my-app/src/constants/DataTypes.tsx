import React from "react";

export type EntriesResponseData = {
  id: number;
  title: string;
  description: string;
  date: Date;
  lastUpdatedDate: Date;
};

export type ResponseData = {
  data: [];
  errors: [];
  hasErrors: boolean;
};
