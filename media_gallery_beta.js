let add = window.location.protocol+'//'+window.location.hostname+'/stoneexpert/';
  sessionStorage.setItem('mime',false);
class Media_gallery {
  constructor(elem){
    this.element = elem;
  }
  setDir(current){
    sessionStorage.setItem('current_dir',current)
  }
  getDir(){
    return sessionStorage.getItem('current_dir');
  }
  setPath(current_path){
    sessionStorage.setItem('path',current_path)
  }
  getPath(){
    return sessionStorage.getItem('path');
  }
  setBase(base_path){
    sessionStorage.setItem('base',base_path)
  }
  getBase(){
    return sessionStorage.getItem('base');
  }
  setMimeType(mime_type){
    sessionStorage.setItem('mime_type',mime_type);
    sessionStorage.setItem('mime',true);
  }
  getMime(){
      return {
        "mime" : sessionStorage.getItem('mime'),
        "mime_type" : sessionStorage.getItem('mime_type')
      }
  }
  media_init(folder,action,current=false,data=false){
    this.setDir(current);
    this.setPath(folder);
    $('.media-back').val(folder.replace(/\/+/g, '\/'));
    $('.media-back').attr('data-rel',current);
    if(current && current != media_gallery.getBase()){
       route.push(current); 
    }

    $.post('./media_controller.php',{
      "action":action,
      "folder":folder
    },function(data){
      console.log(this);
      this.create_body(data);
    }.bind(this))
  }
  create_body(data){
    let file_data = JSON.parse(data);
    let views = '';
    let i;
    console.log('//.///'.replace(/(\.\.\/)/g, ''));
    for(i in file_data){
      if(file_data[i].type =='folder'){
         console.log(file_data[i].path.replace(/\.\/+/g, ''));
         views += `<div class="col-md-2 adp-thumbnail">
         <a href="${file_data[i].path.replace(/\.\/+/g, '')}" class="adp-folder-path" data-id="${file_data[i].name}">
            <img class="img-thumbnail adp-prev-folder" src="./images/folder.png">
            <span class="folder-name">${file_data[i].name}</span>
            </a>
          </div>`;

      }
     
    }
    for(i in file_data){
      if(file_data[i].type =='file'){
        if(this.testMime(file_data[i].mime_type)){
        if(file_data[i].mime_type == 'image/jpeg' || file_data[i].mime_type == 'image/jpg' || file_data[i].mime_type == 'image/png' || file_data[i].mime_type == 'image/gif'){
           views += `<div class="col-md-2 adp-thumbnail">
            <a href="${file_data[i].path}" class="thumb-close">&times;</a>
            <img class="img-thumbnail adp-thumb" src="${file_data[i].path}">
            <span class="folder-name">${file_data[i].name.substring(0,25)}</span>
          </div>`;
        }else{
          views += `<div class="col-md-2 adp-thumbnail">
            <a href="${file_data[i].path}" class="thumb-close">&times;</a>
            <img class="img-thumbnail adp-thumb" src="./images/file.png">
            <span class="folder-name">${file_data[i].name.substring(0,25)}</span>
          </div>`;
        }
      
      }
    }
     
    }
    $('.adp-prev').html(views);
    $('.adp-folder-path').click(function(e){
      e.preventDefault();
      // $('.media-back').attr('data-rel',$(this).attr('data-id'));
      media_gallery.media_init($(this).attr('href'),'get',$(this).attr('data-id'));
      // console.log(media_gallery.getCurrent());
        })
  }
  testMime(mime){
    // console.log(media_gallery.getMime().mime);
    if(this.getMime().mime != 'false'){
      if(this.getMime().mime_type == mime){
        return true;
      }
    }else{
    return true;
  }
}
 

}



const media_gallery = new Media_gallery;
media_gallery.setBase('./');
var route = [media_gallery.getBase()];
// media_gallery.setMimeType('image/jpeg');

media_gallery.media_init(media_gallery.getBase(),'get');


$('.media-back').click((e)=>{
  if(route.join() != media_gallery.getBase()){
  route.splice(-1,1);
  console.log(route.join());
  }

  if(e.target.value != media_gallery.getBase()){
  media_gallery.media_init(removeWord(e.target.value,'/'+e.target.getAttribute('data-rel')),'get',route[route.length-1]);
  }

})

function removeWord(str,searchWord){
    // var str = this;
    var n = str.search(searchWord);
    while(str.search(searchWord) > -1){
        n = str.search(searchWord);
        str = str.substring(0, n) + str.substring(n + searchWord.length, str.length);
    }
    return str;
}
// $(document).ready(function(){
  console.log('divs.length');
  let divs = $('.media-init');
  console.log(divs.length);
  for(let i=0;i<divs.length;i++){
    divs.eq(i).after('<div class="media-thumb-wrapper"></div>');
  }
  // console.log('divs.length');
// });
  var bundle = [];
$('.media-init').click(function(e){
  e.preventDefault();
  // let divs = document.querySelectorAll('.media-init');
  
  if($(this).attr('type') == 'multiple'){
    $('#adpModal').modal('show').attr('data-rel',$(this).attr('id')).attr('type','multiple').addClass('multiple');
    // if(data){
      if($(this).val() != ''){
      bundle = $(this).val().split(',');
      console.log(bundle);
      let imgs = $('.adp-thumb');
      for(let i=0;i<imgs.length;i++){
        for(let s=0;s<bundle.length;s++){
          if(imgs.eq(i).attr('src').substring(imgs.eq(i).attr('src').lastIndexOf('upload')) == bundle[s]){
          imgs.eq(i).addClass('multiple');
        }
        }
        
      }
    // }
  }
  }else{
    $('#adpModal').modal('show').attr('data-rel',$(this).attr('id')).attr('type','').removeClass('multiple');
  }
    
    // $('.main-box,.sub-box').optiscroll();
});

// function adp_agllery_init(data = false){
$('.adp-thumb').click(function(){
  let body = $(this).parents().eq(6);
let href = $(this).attr('src').substring($(this).attr('src').lastIndexOf('upload'));
  if(body.attr('type') == "multiple"){
    $(this).toggleClass('multiple');
    $('.multiple .insert').show();
   
    if(bundle.length == 0){
      bundle = [href];
    }else{
      bundle_push = true;
      for(let i=0;i<bundle.length;i++){
        // console.log(bundle[i].lastIndexOf(href));
      if(bundle[i].lastIndexOf(href) == 0){
        // console.log(bundle[i].lastIndexOf(href));
        bundle.splice(i,1);
        bundle_push = false;
      }
    }
    if(bundle_push){
      bundle.push(href);
    }
    }
    
  }else{
    $('.insert').hide();
      $('#'+body.attr('data-rel')).val(href);
  body.modal('hide');
  // console.log($('#'+body.attr('data-rel')).siblings());
   str=`<ul class="adp-media-thumb "><li><img class="img-thumbnail" src='${add+href}'></li></ul>`;
    $('#'+body.attr('data-rel')).siblings().eq(1).html(str);
  }

$('.insert').unbind('click').click(function(e){
  e.preventDefault();
      body.modal('hide');
      let tar = body.attr('data-rel');
      console.log(window);
      let str_bundle = bundle.join(',');
    $('#'+tar).val(str_bundle);

    // $('#slide_img').on('keyup',()=>{    
    // let field_data = $(this).val();
    let datas = str_bundle.split(',');
    // console.log(datas);
    
    let str='';
    str='<ul class="adp-media-thumb ">';
    for(let i=0;i<datas.length;i++){
      str += `<li><img class="img-thumbnail" src='${add+datas[i]}'></li>`;
    }
    str += '</ul>';
    // $('#'+tar).after(str);
    $('#'+tar).siblings().html(str);
    // console.log($('#'+tar).siblings().html('dfg'));
    // });

    });

})
// }
$('.thumb-close').click(function(e){
  e.preventDefault();
  $.post('media_ctrl.php',{action:"del",file:$(this).attr('href')},function(data){
    console.log(data);
    if(data == 'success'){
            
      $('.adp-alert').addClass('alert-success').fadeIn().html('File Deleted Successfully').delay(500).fadeOut(250).delay(500);
    }
  });
  $(this).parents().eq(0).fadeOut(500);
})
media_gallery_init();
function media_gallery_init(){
  let media_divs = $('.media-init');
  for (let md=0;md<media_divs.length;md++) {
    if(media_divs.eq(md).attr('type') == 'multiple'){
      if(media_divs.eq(md).val() != ''){
        let str='';
        let datas = media_divs.eq(md).val().split(',');
        str='<ul class="adp-media-thumb ">';
        for(let i=0;i<datas.length;i++){
          str += `<li><img class="img-thumbnail" src='${add+datas[i]}'></li>`;
        }
        str += '</ul>';
        media_divs.eq(md).siblings().html(str);
      }
      }
      
  }
}

  $('.mkdir').click(function(){
    $('#adpModal2').modal('show');
  })
