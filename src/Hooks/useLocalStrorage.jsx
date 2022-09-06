const useLocalStorage = () => {
  const storeTheme = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getTheme = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return;
    return JSON.parse(data);
  };

  return [storeTheme, getTheme];
};

export default useLocalStorage;
