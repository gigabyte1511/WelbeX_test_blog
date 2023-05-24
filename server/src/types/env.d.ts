declare namespace NodeJS {
    interface ProcessEnv {
        DB_NAME: string
        DB_USERNAME: string
        DB_PASSWORD: string
        DB_HOST: string
        BCRYPT_SALT_ROUND: string
        JWT_SECRET: string
        JWT_ACCESS_TOKEN_LIFETIME_IN_SECONDS: string
        JWT_REFRESH_TOKEN_LIFETIME_IN_SECONDS: string
        SERVER_PORT: string
    }
}
