export const useQuery = () => {
  return new URLSearchParams(window.location.search);
};

export const languageName = (code) => {
  const languageNames = new Intl.DisplayNames(["tr"], { type: "language" });
  return languageNames.of(code);
};
