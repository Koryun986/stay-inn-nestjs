import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { initializeApp } from "firebase/app";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

@Injectable()
export class CloudStorageService {
  private readonly storage: FirebaseStorage;

  constructor(private configService: ConfigService) {
    const config = {
      apiKey: configService.get<string>("firebase.apiKey"),
      authDomain: configService.get<string>("firebase.authDomain"),
      projectId: configService.get<string>("firebase.projectId"),
      storageBucket: configService.get<string>("firebase.storageBucket"),
      messagingSenderId: configService.get<string>(
        "firebase.messagingSenderId",
      ),
      appId: configService.get<string>("firebase.appId"),
      measurementId: configService.get<string>("firebase.measurementId"),
    };

    initializeApp(config);
    this.storage = getStorage();
  }

  async uploadRentFlatImages(
    files: Array<Express.Multer.File>,
    userId: number,
    rentFlatId: number,
  ) {
    try {
      const folderName = `${this.configService.get<string>(
        "firebase.storageRentFlatFolder",
      )}/user_${userId}/rent_flat_${rentFlatId}`;
      const downloadUrls = await this.uploadFilesToBucket(files, folderName);
      return downloadUrls;
    } catch (e) {
      throw new Error("Can't upload files to Firebase Cloud Storage");
    }
  }

  async uploadUserAvatar(
    userId: number,
    image?: Express.Multer.File,
  ): Promise<string> {
    try {
      if (!image) {
        return await this.getDefaultAvatarUrl();
      }

      const folderName = `${this.configService.get<string>(
        "firebase.storageAvatarFolder",
      )}/user_${userId}`;

      let downloadUrl: string;
      new Promise(async (resolve) => {
        resolve(
          await this.uploadFileToBucket(
            folderName,
            image.buffer,
            image.originalname,
            image.mimetype,
          ),
        );
      }).then((url: string) => {
        downloadUrl = url;
      });

      return downloadUrl;
    } catch (e) {
      throw new Error("Can't upload files to Firebase Cloud Storage");
    }
  }

  private async uploadFilesToBucket(
    files: Array<Express.Multer.File>,
    bucketName: string,
  ) {
    const downloadUrls: string[] = [];

    await Promise.all(
      files.map(async ({ buffer, originalname, mimetype }) => {
        const downloadUrl = await this.uploadFileToBucket(
          bucketName,
          buffer,
          originalname,
          mimetype,
        );
        downloadUrls.push(downloadUrl);
      }),
    );

    return downloadUrls;
  }

  private async uploadFileToBucket(
    bucketName: string,
    buffer: Buffer,
    originalname: string,
    mimetype: string,
  ) {
    const filePath = `${bucketName}/${Date.now()}_${originalname}`;
    const storageRef = ref(this.storage, filePath);
    const snapshot = await uploadBytesResumable(storageRef, buffer, {
      contentType: mimetype,
    });

    return await getDownloadURL(snapshot.ref);
  }

  private async getDefaultAvatarUrl() {
    const defaultAvatarFilePath = `${this.configService.get<string>(
      "firebase.storageAvatarFolder",
    )}/default/default-avatar.jpg`;
    const storageRef = ref(this.storage, defaultAvatarFilePath);

    return await getDownloadURL(storageRef);
  }
}
