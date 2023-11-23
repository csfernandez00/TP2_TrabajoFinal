import "dotenv/config";

const PORT = process.env.PORT;
const MESSAGE = process.env.MESSAGE;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, MESSAGE, JWT_SECRET };
