import { File, FileOptions } from "buffer";
import { sendFile } from "./apiservice";
import { imageBaseUrl } from "./constants";

export async function sendImage(
  file: File,
  documentType: string,
  userID: string
) {
  try {
    if (file.filename && file.uri && file.type) {
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: file.type,
        name: file.filename,
      });
      formData.append("imageRelated", documentType);
      formData.append("userRole", userID);
      const result = await sendFile(formData);
      if (result?.status == 200 && result.data.entityUid) {
        return result.data.entityUid;
      } else return "";
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}
export function getImages(filename: string, imageType: string) {
  let imageUrl = imageBaseUrl + "img/appImages/";
  switch (imageType) {
    case "PROFILE":
      return `${imageUrl}Profile/${filename}`;

    case "ID_CARD_FRONT":
      return `${imageUrl}IdCard/${filename}`;

    case "ID_CARD_BACK":
      return `${imageUrl}IdCard/${filename}`;

    case "PAN_CARD_FRONT":
      return `${imageUrl}PanCard/${filename}`;

    case "CHEQUE":
      return `${imageUrl}Cheque/${filename}`;

    default:
      return null;
  }
}
