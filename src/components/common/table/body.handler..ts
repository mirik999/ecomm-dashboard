import { format } from 'date-fns';

export function tableBodyHandler(val: any, key: string): any {
  if (val === undefined || val === null) {
    return '';
  }

  if (key === 'createdAt') {
    return format(new Date(val), 'dd MMMM yyyy HH:mm');
  }

  if (key === 'endDate') {
    return format(new Date(val), 'dd MMMM yyyy HH:mm');
  }

  if (key === 'couponList') {
    const used = val.filter((v: any) => v.used);
    return val.length + ' / ' + used.length;
  }

  if (key === 'color') {
    return `<div
      class="w-full rounded"
      style="
        height: 20px;
        background-color: ${val};
        border-radius: 3px;
      "
    />`;
  }

  if (key === 'roles' || key === 'type') {
    const roles = val.join(' - ');
    return `<span class="mr-2">${roles}</span>`;
  }

  if (key === 'brand') {
    return val ? val.name : '';
  }

  if (key === 'subCategories') {
    const countSubCats = val.length;
    return `<span class="mr-2">${countSubCats} sub category</span>`;
  }

  if (typeof val === 'boolean') {
    return val ? '✅ Yes' : '';
  }

  if (val instanceof Array) {
    const brands = val.map((v) => v.name).join(' - ');
    return `<span class="mx-2">${brands}</span>`;
  }

  if (typeof val === 'object') {
    return val[0]?.name;
  }

  return val;
}
