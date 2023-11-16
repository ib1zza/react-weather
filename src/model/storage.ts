export const storage = {
  setItem: (name: string, item: any) => {
    localStorage.setItem(name, JSON.stringify(item));
  },
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    console.log(item, typeof item)



    try {
      return JSON.parse(localStorage.getItem(name) || "null");
    }
    catch {
      return null;
    }

  },
};
