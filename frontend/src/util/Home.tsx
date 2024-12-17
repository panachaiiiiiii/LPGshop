
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days); // days เป็นบวกหรือลบก็ได้
    return result;
  }
  export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    result.setDate(1); // ตั้งวันที่เป็น 1 ของเดือนใหม่
    return result;
  }
  export function addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    result.setMonth(0); // ตั้งเดือนเป็น มกราคม (เดือนที่ 0)
    result.setDate(1); // ตั้งวันที่เป็น 1
    return result;
  }
  export function setMonths(date: Date): Date {
    const result = new Date(date);
    result.setDate(1); // ตั้งวันที่เป็น 1 ของเดือนใหม่
    return result;
  }
  export  function setYears(date: Date): Date {
    const result = new Date(date);
    result.setMonth(0); // ตั้งเดือนเป็น มกราคม (เดือนที่ 0)
    result.setDate(1); // ตั้งวันที่เป็น 1
    return result;
  }
  