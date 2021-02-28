import { format } from "date-fns";

export function tableBodyHandler(val: any, key: string): any {
  if (key === "createdAt") {
    return format(new Date(val), 'dd MMMM yyyy')
  }

  if (key === "color") {
    return `<div
      class="w-full rounded"
      style="
        height: 30px;
        background-color: ${val};
      "
    />`
  }

  if (key === "roles") {
    const roles = val.join(" - ")
    return `<span class="mr-2">${roles}</span>`
  }

  if (key === "brand") {
    return val ? val.name : '';
  }

  if (key === "subCategories") {
    const countSubCats = val.length;
    return `<span class="mr-2">${countSubCats} sub category</span>`
  }

  if (typeof val === "boolean") {
    return val ? '✅ Yes' : ''
  }

  if (val instanceof Array) {
    return val.map(v => `<span class="mx-2">${v.name}</span>`)
  }

  if (typeof val === "object") {
    return val[0]?.name
  }

  return val;
}
