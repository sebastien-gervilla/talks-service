import dotenv from 'dotenv';
dotenv.config();

export interface Environment {
    nodeEnv: 'production' | 'release' | 'development';
    port: number;
    allowedOrigin: string;
    jwtSecret: string;
}

const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) throw new Error('NODE_ENV must be defined.');

const environments: Environment['nodeEnv'][] = ['development', 'release', 'production'];
const nodeEnvironment = environments.find((variable) => variable === nodeEnv.trim());
if (!nodeEnvironment) throw new Error(`NODE_ENV must be in ${environments}.`);

const environmentVariables = [
    'PORT',
    'ALLOWED_ORIGIN',
    'JWT_SECRET',
] as const;

for (const variable of environmentVariables)
    if (!process.env[variable])
        throw new Error(`Environment variable '${variable}' must be defined.`);

const environment: Environment = {
    nodeEnv: nodeEnvironment,
    port: parseInt(process.env.PORT!),
    allowedOrigin: process.env.ALLOWED_ORIGIN!,
    jwtSecret: process.env.JWT_SECRET!,
};

export { environment };