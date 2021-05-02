//GET blogs data from backend
const blogsElement = document.querySelector('.blog__list');
const url = `http://localhost:3001`;
async function getBlogs(){
    try {
        return axios.get(`${url}/blogs`);
    }catch (e){
        console.log(e);
    }
}
getBlogs().then((result)=>{
    result.data.map((blog)=>{
        blogsElement.innerHTML += `<li>${blog.title}</li>`
    })
})

//Responsive header
const toggle = document.querySelector('.responsive__toggle');
toggle.addEventListener('click', function (){
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