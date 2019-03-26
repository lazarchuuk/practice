class PhotoList{
  constructor(photoPosts) {
    this._photoPosts = photoPosts;
  }

  // sort by date function

  _validatePhotoPost(photoPost){
   // console.log(photoPost)
    if ((!photoPost.id)||(!photoPost.description)||(!photoPost.createdAt)
      ||(!photoPost.author)||(!photoPost.photoLink)) {
      return false;
    }

    if (this.get(id)) return false;
    if (photoPost.description.length >= 200) return false;
    return true;
  }

  getPage(skip = 0, top = 10, filterConfig = {}){

    return this._photoPosts.filter(post => {
      return Object.keys(filterConfig).every((key) =>
        if (JSON.stringify(filterConfig[field]) != JSON.stringify(post[field])) return false;
      }
    }).slice(skip, top + skip);
    // sort missed
  }

  get(id){
    return this._photoPosts.find((post) => post.id == id);
  }

  add(photoPost){
    if(!this._validatePhotoPost(photoPost)) return false;
    this._photoPosts.push(photoPost);
    return true;
  }

  edit(id, editConfig){
    if((editConfig.photoLink === '') || ((editConfig.description && editConfig.description.length >= 200))) return false;
    const post = this.get(id);
    // for(const field in editConfig){
    //   post[field] = editConfig[field];
    // }
    Object.assign(post, editConfig);
    // copy Object.assign({}, origin);
    return true;
  }

  removePhotoPost(id){
    this._photoPosts = this._photoPosts.filter((post) => post.id != id);
  }
}

//getPage(9, 7, "User");
//getPhotoPost(4);
//addPhotoPost({id: '11', descriprion: "Lorem", createdAt: new Date('2018-01-01T05:40:00'),
     //         author: 'Viktoriyaa', photoLink: "pictures/10.jpg"});
//removePhotoPost(3);

//editPhotoPost(3, {id: "Lorem"});

const Post = new PhotoList(photoPosts);
//Post.removePhotoPost(3);
//Post.edit(3, { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg' });
console.log(Post);
//console.log(Post._validatePhotoPost({id: '11'}));
//console.log(Post.getPage(0, 4, { createdAt: new Date('2019-03-23T18:10:00') }));
