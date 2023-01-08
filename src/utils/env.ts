import { parse } from "query-string";

export function getRef(): string {
   const params = parse(window.location.search);
   if (typeof params["ref"] === "string") return params["ref"];
   return "";
}
