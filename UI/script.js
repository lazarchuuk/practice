
class ListOfPosts{
  constructor() {
    this._photoPosts = JSON.parse(localStorage.getItem("photoPosts"));
  }

  _validatePhotoPost(photoPost){
    if ((!photoPost.id)||(!photoPost.description)||(!photoPost.createdAt)
      ||(!photoPost.author)||(!photoPost.photoLink)) {
      return false;
    }
    if (this._photoPosts.find((post) => post.id == photoPost.id)) return false;
    if (photoPost.description.length > 200) return false;
    return true;
  }

  getPage(skip = 0, top = 2, filterConfig = {}) {
    let result;
    if (filterConfig.tag !== undefined) {
      result = this._photoPosts.filter(post => post.tags.includes(filterConfig.tag));
    } else {
      result = this._photoPosts.filter(post => {
        for (const field in filterConfig) {
          if (filterConfig[field] === '') return true;
          if (field === 'fromDate') return filterConfig[field] == 'Invalid Date' ? true : filterConfig[field] < post.createdAt;
          if (field === 'toDate') return filterConfig[field] == 'Invalid Date' ? true : filterConfig[field] > post.createdAt;
          if (JSON.stringify(filterConfig[field]) != JSON.stringify(post[field])) return false;
        }
        return true;
      });
    }
    return result.slice(skip * top, (skip + 1) * top);
  }

  get(id){
    return this._photoPosts.find((post) => post.id == id);
  }

  add(photoPost){
    if(!this._validatePhotoPost(photoPost)) return false;
    this._photoPosts.push(photoPost);
    localStorage.setItem("photoPosts", JSON.stringify(this._photoPosts));
    return true;
  }

  edit(id, editConfig){
    if((editConfig.photoLink === '') || ((editConfig.description && editConfig.description.length >= 200))) return false;
    const post = this.get(id);
    for(const field in editConfig) {
      post[field] = editConfig[field];
    }
    localStorage.setItem("photoPosts", JSON.stringify(this._photoPosts));
    return true;
  }

  like(id){
    const post = this.get(id);
    post.likes++;
    localStorage.setItem("photoPosts", JSON.stringify(this._photoPosts));
    return true;
  }

  removePhotoPost(id){
    this._photoPosts = this._photoPosts.filter((post) => post.id != id);
    localStorage.setItem("photoPosts", JSON.stringify(this._photoPosts));
  }
}

//localStorage.setItem("photoPosts", '[]')
const Post = new ListOfPosts(JSON.parse(localStorage.getItem("photoPosts")));
console.log(Post);
//getPage(9, 7, "User");
//getPhotoPost(4);
//addPhotoPost({id: '11', descriprion: "Lorem", createdAt: new Date('2018-01-01T05:40:00'),
     //         author: 'Viktoriyaa', photoLink: "pictures/10.jpg"});
//removePhotoPost(3);

//editPhotoPost(3, {id: "Lorem"});


//Post.removePhotoPost(3);
//Post.edit(3, { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg' });

//console.log(Post._validatePhotoPost({id: '11'}));
//console.log(Post.getPage(0, 4, { createdAt: new Date('2019-03-23T18:10:00') }));
