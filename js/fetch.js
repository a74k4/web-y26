const preloader = document.getElementById('preloader');
const postsContainer = document.getElementById('posts__list');
const posts = document.getElementById('posts__list_container');
const errorContainer = document.getElementById('error');
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        const data = await response.json();


        let sortNumber = Math.floor(Math.random() * 100 + 1);


        data.forEach((post) => {
            if(post.id < sortNumber){
                let newLi = document.createElement('li');
                newLi.innerHTML = ` 
                    <div class="posts_title"><strong>Title:</strong> ${post.title}</div> 
                    <div class="posts_body"><strong>Body:</strong> ${post.body}</div> 
                `;
                postsContainer.prepend(newLi);
            }
        });
    }
    catch (e) {
        console.error("Ошибка при загрузке данных:", e.message);
        errorContainer.textContent = `Не удалось загрузить данные: ${e.message}`;
    }
    finally {
        posts.style.display = "block";
        preloader.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => fetchData());