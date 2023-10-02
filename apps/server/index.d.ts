interface IConfig {
  PORT?: number;
  GLOBAL_PREFIX?: string;
  API_VERSION?: number;
  APP_DOMAIN?: string;

  SWAGGER_ROUTE?: string;

  JWT_SECRET?: string;

  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
}
