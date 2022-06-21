export const makeImagePath = (id: string, format?: string) => {
  return id
    ? `https://image.tmdb.org/t/p/${format || 'original'}/${id}`
    : 'https://user-images.githubusercontent.com/56498435/174693423-5e719287-4466-42ba-a3c3-b022f8dbb50b.PNG';
};
