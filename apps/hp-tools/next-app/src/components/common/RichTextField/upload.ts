import { uploadImage, getImage } from "libs/firebase";
import { createImage } from "src/apis/image";

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const uploadProjectImage = async (file: File): Promise<string> => {
  const firebaseImage = await uploadImage(file, `images/${file.name}`);
  const downloadUrl: string = await getImage(firebaseImage.metadata.fullPath);

  if (downloadUrl) {
    const uploadedImage = await createImage({
      url: downloadUrl,
      alt_name: file.name,
    });
  }
  return downloadUrl;
};

class ImageUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(async (file: File) => {
      return uploadProjectImage(file);
    });
  }
}

export function ImageUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new ImageUploadAdapter(loader);
  };
}
