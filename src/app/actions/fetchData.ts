"use server";

export const fetchData = async () => {
  const data = await fetch(
    `https://gist.githubusercontent.com/Jalal-Amourgha/d8c8800caffcbb90a10e5ccfda114a1a/raw/c07cf901dcc9c4b0a3b638fa63d609b0bbb16525/_data`
  );

  const res = await data.json();

  return res;
};
