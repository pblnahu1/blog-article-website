export function slugify(text) {
  if (typeof text === "undefined") {
    return "";
  }
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text 
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

/**
 * Esta función toma un array de objetos de blog posts y los formatea para mostrarlos en una página de blog.
 * Cada objeto de blog post se espera tener las siguientes propiedades:
 * - title: el título del post
 * - author: el autor del post
 * - date: la fecha de publicación del post
 * - content: el contenido del post
 * 
 * La función itera sobre cada objeto de blog post y realiza las siguientes transformaciones:
 * - Añade una propiedad "formattedDate" que contiene la fecha de publicación formateada
 * - Añade una propiedad "excerpt" que contiene el contenido del post cortado en 200 caracteres
*/
export function formatBlogPosts(posts, {
  
  // filter out posts that should not be displayed
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {
  const filteredPosts = posts.reduce((acc, post) => {
    
    const { date, draft } = post.frontmatter;
    
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc; 

    // agregar post a acc
    return [...acc, post];
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a,b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  }
  else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") { 
    return filteredPosts.slice(0, limit);
  }
  
  return filteredPosts;
}