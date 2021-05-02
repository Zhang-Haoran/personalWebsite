const url = `http://localhost:3001`;
//POST blog data into backend
function addBlog(){
    const blogsTitle = document.querySelector('#title').value;
    const blogContent = document.querySelector('#content').value;
    try {
        axios.post(`${url}/blogs/add?title=${blogsTitle}&content=${blogContent}`).then((result)=>{
            if (result.data === 'success'){
                $('#staticBackdrop').modal('toggle');//手动关闭弹窗
                window.location.reload();
            }
        });
    }catch (e){
        console.log(e);
    }
}
//GET blogs data from backend
function getBlogs() {
    const blogsElement = document.querySelector('.blog__list');
    try {
        axios.get(`${url}/blogs`).then((result) => {
            result.data.map((blog) => {
                blogsElement.innerHTML +=
                    `<li class="blog__list__item">
                <h3 class="blog__list__item__title">${blog.title}</h3> 
                <p class="blog__list__item__content">${blog.content}</p>
                <p class="blog__list__item__created-time">Created at: ${blog.created_time}</p>
                <p class="blog__list__item__updated-time">Last updated: ${blog.updated_time}</p>
                <button class="btn btn-primary">Update</button>
                <button class="btn btn-danger">Delete</button>
             </li>`
            })
        });
    } catch (e) {
        console.log(e);
    }
}
getBlogs();

//Responsive header
const toggle = document.querySelector('.responsive__toggle');
toggle.addEventListener('click', function () {
    const body = document.querySelector('body');
    body.classList.toggle('responsive__toggle--active');
    //开启与关闭菜单栏。toggle后面加class 不需要加点。
    this.classList.toggle('bi-x');
    this.classList.toggle('bi-list');
})

//Introduction paragraph animation
const typed = document.querySelector('.introduction__paragraph__animation')
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.introduction__paragraph__animation', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}