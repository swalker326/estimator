import S3 from "react-aws-s3";

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
};
export const ImageUpload = (file) => {
  let newFileName = Date.now();
  const ReactS3Client = new S3(config);
  ReactS3Client.uploadFile(file, newFileName).then((data) => {
    console.log("data", data); // eslint-disable-line
    if (data.status === 204) {
      console.log("success");
    } else {
      console.log("fail");
    }
  });
}