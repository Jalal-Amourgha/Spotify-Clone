"use server";

export const fetchData = async () => {
  const data = await fetch(
    `https://gist.githubusercontent.com/Jalal-Amourgha/d8c8800caffcbb90a10e5ccfda114a1a/raw/9784a20fbbcca50ddff405608c5ee445c996c16f/gistfile1.txt`
  );

  const res = await data.json();

  return res;
};
