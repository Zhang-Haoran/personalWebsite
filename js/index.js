//Url connect to backend
const url = `https://localhost:7071/api/v1`;
//Get previous content, put it into modal form and handle user click submit button
function updateCommentModal(id, title, content){
    let commentsTitle = document.querySelector('#updateModalTitle');
    let commentContent = document.querySelector('#updateModalContent');
    const updateModalButton = document.querySelector('#updateModalButton');
    commentsTitle.value = title;
    commentContent.value = content;
    updateModalButton.addEventListener('click',function (){
        const currentTitle = document.querySelector('#updateModalTitle').value;
        const currentContent = document.querySelector('#updateModalContent').value;
        updateComment(id,currentTitle,currentContent);
    })
}

//UPDATE comment data from backend
function updateComment(id, title, content){
    requestBody = {
        "commentId":id,
        "title": title,
        "content": content
    }
    try {
        axios.put(`${url}/comment/${id}`,requestBody).then((result)=>{
            if (result.status === 204){
                window.location.reload();
            }
        });
    }catch (e){
        console.log(e);
    }
}
//DELETE comment data from backend
function deleteComment(id){
    try {
        axios.delete(`${url}/comment/${id}`).then((result)=>{
            if (result.status === 204){
                window.location.reload();
            }
        });
    }catch (e){
        console.log(e);
    }
}
//POST comment data into backend
function addComment(){
    const commentsTitle = document.querySelector('#title').value;
    const commentContent = document.querySelector('#content').value;
    requestBody = {
        "title": commentsTitle,
        "content": commentContent
    }
    try {
        axios.post(`${url}/comment`, requestBody).then((result)=>{
            if (result.status === 201){
                $('#staticBackdrop').modal('toggle');//手动关闭弹窗
                window.location.reload();
            }
        });
    }catch (e){
        console.log(e);
    }
}
//GET comments data from backend
function getComments() {
    const commentsElement = document.querySelector('.comment__list');
    try {
        axios.get(`${url}/comment`).then((result) => {
            result.data.map((comment) => {
                commentsElement.innerHTML +=
                    `<li class="comment__list__item">
                <h3 class="comment__list__item__title">${comment.title}</h3> 
                <p class="comment__list__item__content">${comment.content}</p>
                <p class="comment__list__item__created-time">Created at: ${comment.createdTime}</p>
                <p class="comment__list__item__updated-time">Last updated: ${comment.updatedTime}</p>
                <button class="btn btn-outline-primary btn-sm" onclick="updateCommentModal(${comment.commentId}, '${comment.title}', '${comment.content}')" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteComment(${comment.commentId})">Delete</button>
             </li>`
            })
        });
    } catch (e) {
        console.log(e);
    }
}
getComments();

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