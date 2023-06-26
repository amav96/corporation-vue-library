import { reactive } from "vue";

export const allowedFiles = (files: Array<File>, accept: string[]) =>  [...files].filter((f) => accept.includes(f.type))

export const convertBase64 = (image : any, name = 'img') => {
    console.log(image)
    return new Promise((resolve) => {
      const typeImg = image.split('/')[1].split(';')[0];
      const arr = image.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      const nameImage = name.replace(/[^A-Za-z]/g, '').substr(0, 20) + image.split('/')[4].substr(-5);
      const numRamdon = Math.floor(Math.random() * 1000) + 1;
  
      while (n > 0) {
        n -= 1;
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], `${numRamdon}-${nameImage}.${typeImg}`, { type: mime });
      resolve(file);
    });
  }
  
export const convertFileToRender = (file : any)  => {
    const buildImage : any = reactive({
        readyState: 0,
        image: {
            base64: '',
            file: null,
            url: ''
        },
    });
    if (file) {
        if (file !== undefined && file !== '') {
        const reader = new FileReader();
        buildImage.readyState = reader.readyState;
        reader.onload = async (e : any) => {
            buildImage.readyState = reader.readyState;
            const image = {
              base64: e.target.result,
              file,
              url: ''
            };
            buildImage.image = image;
        };
        buildImage.readyState = reader.readyState;
        reader.readAsDataURL(file);
        }
    }
    return buildImage;
}
