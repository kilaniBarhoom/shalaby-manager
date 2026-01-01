// export const allowedOrigins = [process.env.CLIENT_URL.split(" ")];
// export const allowedOrigins = ["http://localhost:5173", "http://192.168.1.8:5173", "https://j7v38ztk-5173.euw.devtunnels.ms"];


const corsOptions = {
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
};

export default corsOptions;
