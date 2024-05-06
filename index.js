const newsButton = document.getElementById("newsbutton")
function inputNews()
{   
    const newsTitle = document.getElementById("newsinput") 
    news(newsTitle.value)
}
async function news(topic) {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=2024-04-06&sortBy=publishedAt&apiKey=2e7be75508d04796a3cf1294439581a3`);
    if (!response.ok) {
      throw new Error('Bad Request');
    }
    const data = await response.json();
    const completeNews = data.articles;
    const section2header = document.getElementById("section2header");
    if (section2header) {
      section2header.remove();
    }
    const section2 = document.getElementById("section2");
    const articles = section2.querySelectorAll("article");
    if (articles.length > 0) {
      articles.forEach(article => {
        article.remove();
      });
    }

    for (let i = 0; i < 25; i++) {
      const article = document.createElement("article");
      const heading = document.createElement("h3");
      heading.textContent = completeNews[i].title;
      const para = document.createElement("p");
      para.textContent = completeNews[i].description;
      article.appendChild(heading);
      article.appendChild(para);
      section2.appendChild(article); 
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred while fetching news. Please try again later.');
  }
}


newsButton.addEventListener("click",inputNews)