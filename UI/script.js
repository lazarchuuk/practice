(function(){

  var photoPosts = [

  {
    id: "1", //user
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2019-02-23T23:40:00'),
    author: 'User',
    photoLink: "pictures/1.jpg"
  },
  {
    id: '2',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2019-03-23T18:10:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/2.jpg"
  },
  {
    id: '3', //user
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-03-21T17:40:00'),
    author: 'User',
    photoLink: "pictures/3.jpg"
  },
  {
    id: '4', //user
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-02-26T16:19:00'),
    author: 'User',
    photoLink: "pictures/4.jpg"
  },
  {
    id: '5',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-03-18T06:55:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/5.jpg"
  },
  {
    id: '6',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-01-23T08:40:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/6.jpg"
  },
  {
    id: '7',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-01-31T16:35:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/7.jpg"
  },
  {
    id: '8',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-02-23T15:56:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/8.jpg"
  },
  {
    id: '9',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-03-05T19:40:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/9.jpg"
  },
  {
    id: '10',
    descriprion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua. Ud exercitation ex ea commodo consequat.",
    createdAt: new Date('2018-01-01T05:40:00'),
    author: 'Viktoriyaa',
    photoLink: "pictures/10.jpg"
  },
  ];


  // sort by date function
  function getPhotoPosts(skip, top, filterConfig){
   var n = 0;
   if(top+skip > 10){
    console.log("Wrong input.");
  }
  else{
    if(filterConfig){
      for(var i = skip; i < top + skip; i++){
        if(photoPosts[i].author == filterConfig){
          console.log(photoPosts[i]);
        }
      }
    }
    else{
      for(var i = skip + 1; i <= top + skip; i++){
        console.log(photoPosts[i-1]);
      }
    }  
  }
}

function getPhotoPost(id){
  if(id>10){
    console.log("Wrong input");
  }
  else{
    for(var i = 1; i <=10; i++){
      if(photoPosts[i-1].id == id)
        console.log(photoPosts[i-1]);
    }
  }  
}

function validatePhotoPost(photoPost){
  //??????
}

function addPhotoPost(photoPost){
  photoPosts.splice(photoPosts.length, 0, photoPost);
  //??????????
}

function removePhotoPost(id){
  photoPosts.splice((id-1), 1);
}
getPhotoPosts(3, 7, "User");
//getPhotoPost(4);
//addPhotoPost({id: '11', descriprion: "Lorem", createdAt: new Date('2018-01-01T05:40:00'),
     //         author: 'Viktoriyaa', photoLink: "pictures/10.jpg"});
//removePhotoPost(3);

//for(i=0; i < 10; i++){console.log(photoPosts[i]);}
}());
