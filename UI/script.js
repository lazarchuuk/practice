class PhotoList{
  constructor(photoPosts) {
    this.photoPosts = photoPosts;
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

  getPage(skip = 0, top = 10, filterConfig = {}) {
    const posts = this.photoPosts;

    posts.sort((p1, p2) => p1.createdAt - p2.createdAt);
    
    posts = posts.filter(post => {
      for (const field in filterConfig.match) {
        if (JSON.stringify(filterConfig.match[field]) != JSON.stringify(post[field])) {
          return false;
        }
      }
      return true;
    })

    if (filterConfig.tags){
      posts = posts.filter(post => {
        return  filterConfig.tags.some(tag1 => {
          return post.tags.some(tag2 => tag2 == tag1);
        });
      })
    }

    if (filterConfig.createdFrom) posts = posts.filter(post => post.createdAt > filterConfig.createdFrom);
    if (filterConfig.createdTo) posts = posts.filter(post => post.createdAt < filterConfig.createdTo);

    return posts.slice(skip, top + skip);
  }


  get(id){
    return this.photoPosts.find((post) => post.id == id);
  }

  add(photoPost){
    if(!this._validatePhotoPost(photoPost)) return false;
    this.photoPosts.push(photoPost);
    return true;
  }

  edit(id, editConfig){
    if((editConfig.photoLink === '') || ((editConfig.description && editConfig.description.length >= 200))) return false;
    const post = this.get(id);
    Object.assign(post, editConfig);
    return true;
  }

  removePhotoPost(id){
    this.photoPosts = this.photoPosts.filter((post) => post.id != id);
  }
}

//getPage(9, 7, "User");
//getPhotoPost(4);
//addPhotoPost({createdFrom: '', match: {id: '11', descriprion: "Lorem",
     //         author: 'Viktoriyaa', photoLink: "pictures/10.jpg"}});
//removePhotoPost(3);

//editPhotoPost(3, {id: "Lorem"});

const Post = new PhotoList(photoPosts);
//Post.removePhotoPost(3);
//Post.edit(3, { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg' });
console.log(Post);
(new View().displayHeader().displayPosts(photoPosts));
//console.log(Post._validatePhotoPost({id: '11'}));
//console.log(Post.getPage(0, 4, { createdAt: new Date('2019-03-23T18:10:00') }));
