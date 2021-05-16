const cache: Record<string, any> = {};

// eslint-disable-next-line no-return-assign
const importAll = (r) => r.keys().forEach((key: string) => (cache[key] = r(key)));

importAll(require.context('../../', true, /\.svg$/));

export class ImageLoader {
  private images: Record<string, HTMLImageElement> = {};
  private loaded = false;

  constructor() {
    this.loadImages();
  }

  private getImageName = (path: string) => path.split('/').reverse()[0];

  private loadImage = (base64Img: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);

    img.src = base64Img;
  });

  private loadImages = async () => {
    const res = await Promise.all(Object.keys(cache).map((path) => {
      const { default: base64Image } = cache[path];

      return this.loadImage(base64Image)
        .then((img) => {
          const name = this.getImageName(path);

          this.images[name] = img;
        })
        .catch((err) => ({ error: { err, msg: `Image ${this.getImageName(path)} could not be loaded` } }));
    }));

    if (res.filter(Boolean).length) {
      // eslint-disable-next-line no-console
      console.error(res);
    } else {
      this.loaded = true;
    }
  };

  public getImage = (name: string) => this.images[name];

  public isLoaded = () => this.loaded;
}
